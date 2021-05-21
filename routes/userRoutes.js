const Router = require('express');
const UserController = require('../controller/userController');

const router = new Router();


router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getOneUser);
router.post('/registration', UserController.userCreate);
router.post('/authorization', UserController.userAuthorization);
router.post('/refresh', UserController.userTokenRefresh);//TODO переделать
router.delete('/users/:id', UserController.userDelete);
router.put('/users', UserController.userUpdate);


module.exports = router;