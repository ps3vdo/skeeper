const Router = require('express');
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes')

const router = new Router();

router.use('/api', notesRoutes);
router.use('/api', userRoutes);



module.exports = router;