const Router = require('express');
const userController = require('../controller/userController');

const router = new Router();

router.post('/registration', userController.userCreate);
router.post('/login', userController.userAuthorization);
router.post('/refresh_token', userController.checkTokenRefresh);

router.get('/user/:id', userController.getOneUser);
router.get('/users', userController.getUsers);
router.patch('/users', userController.userUpdate);
router.delete('/users/:id', userController.userDelete);

module.exports = router;