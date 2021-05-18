const Router = require('express');
const userRoutes = require('./userRoutes');

const router = new Router();

router.use('/', userRoutes);


module.exports = router;