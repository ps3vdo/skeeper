const Router = require('express');
const UserController = require('../controller/userController');

const router = new Router();

router.post('/registration', UserController.userCreate);
router.post('/authorization', UserController.userAuthorization);
router.delete('/user/:id', UserController.userDelete);
router.put('/user', UserController.userUpdate);


module.exports = router;