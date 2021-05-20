const Router = require('express');
const UserController = require('../controller/userController');

const router = new Router();

router.get('/users/:id', UserController.getOneUser);
router.get('/users', UserController.getUsers);
router.post('/registration', UserController.userCreate);
router.post('/authorization', UserController.userAuthorization);
router.post('/refresh', UserController.userTokenRefresh);//TODO переделать
router.delete('/user/:id', UserController.userDelete);
router.put('/user', UserController.userUpdate);


module.exports = router;