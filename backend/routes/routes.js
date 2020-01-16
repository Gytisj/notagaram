const router = require("express").Router();
const userController = require('../user/userController.js');
const toDoListController = require('../toDoList/toDoListController.js');
const middleware = require('../middleware/middleware.js');

router.get('/', (req, res) => {
    res.json('API STATUS: working');
})

//user routes
router.post('/user/register', userController.register);
//router.get('/user/getAllUsers', userController.getAll);
//router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.post('/user/login', userController.login);
router.get('/user/logout', middleware.authenticate, userController.logout);

//toDoList routes
router.post('/toDoList/addList', middleware.authenticate, toDoListController.addList);
router.get('/toDoList/getAllLists', middleware.authenticate, toDoListController.getAllLists);
router.get('/toDoList/getSingleList/:id', toDoListController.getSingleList);
router.delete('/toDoList/findOneAndRemove/:id', toDoListController.findOneAndRemove);
router.patch('/toDoList/findOneAndUpdate/:id', toDoListController.findOneAndUpdate);



module.exports = router;