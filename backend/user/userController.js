const User = require('./userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const register = (req, res) => {
    let data = req.body;
    let user = new User();
    user.username = data.username;
    user.fullName = data.fullName;
    user.password = data.password;
    user.save().then((createdUser) => {
        res.json(createdUser)
    }).catch((err) => {
        res.status(400).json(err);
    })
}

const getAll = async (req, res) => {
    try {
        let users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(400).json(err);
    }

}

const logout = (req, res) => {
    let token = req.token
    let user = req.user
    user.update({
      $pull: {
        tokens: {
          token
        }
      }
    }).then(() => {
      res.json("logged out")
    }).catch(e => res.status(400).json(e))
  }

const getSingleUser = async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id);
        user ? res.json(user) : res.json('No such user');
    } catch (err) {
        res.status(400).json(err);
    }

}

const login = async (req, res) => {

    try {
        let user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            res.status(400).json('No such user');
            return
        }
        bcrypt.compare(req.body.password, user.password, (err, response) => {

            if (response) {
                
                let access = 'auth';
                let token = jwt.sign({
                    _id: user._id.toHexString(),
                    access: access
                }, config.password).toString();

                user.tokens.push({
                    token,
                    access
                })
                user.save().then(() => {
                    res.header('x-auth', token).json(user);
                })

            } else {
                res.status(401).json('Login failed');
            }
        });


    } catch (err) {
        res.status(400).json(err);
    }
}

const getFullName = async (req,res)=>{
    try {
        const userFullName = req.user.fullName;
        res.json(userFullName);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getFollowers = async(req,res)=>{
    const id = req.user._id;
    try{
        let user = await User.findById(id);
        user ? res.json(user.followers) : res.json('No such user'); 
    }
    catch(error){
        console.log('No Followers found ' + error);
    }
}

const addProfileImage = async (req,res)=>{
    let token = localStorage.getItem('x-auth');
}

module.exports = {
    register,
    getAll,
    getSingleUser,
    login,
    logout,
    getFullName,
    getFollowers,
    addProfileImage
};