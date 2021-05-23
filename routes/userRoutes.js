const Router = require('express');
const userController = require('../controller/userController');

const router = new Router();

router.post('/registration', userController.userCreate);
router.post('/login', userController.userAuthorization);
router.post('/refresh_token', userController.userTokenRefresh);//TODO переделать

router.get('/user/:id', userController.getOneUser);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.userDelete);
router.patch('/users', userController.userUpdate);


module.exports = router;