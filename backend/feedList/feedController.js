const PostModel = require('../postList/postModel');

const getAllFollowingPosts = async (req, res) => {

    // let following = req.user.following;
    let following = ['5e27577428059d5637d32312', '5e276d391eb5f65803303620'];


    try {

        let pageNumber = req.params.pageNumber;

        let nPerPage = 10;

        let result = await PostModel.find({
            userID: following
        })
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .limit(nPerPage)
        res.json(result);


    } catch (err) {
        res.status(400).json(err);
    }

}

const getAllPosts = async (req, res) => {
    try {

        let pageNumber = req.params.pageNumber;

        let nPerPage = 10;

        let result = await PostModel.find({
        })
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .limit(nPerPage)
        res.json(result);


    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getAllFollowingPosts,
    getAllPosts
}