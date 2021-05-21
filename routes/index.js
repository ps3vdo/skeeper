const Router = require('express');
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes');
const linksRoutes = require('./linksRoutes');

const router = new Router();

router.use('/api', notesRoutes);
router.use('/api', userRoutes);
router.use('/api', linksRoutes);



module.exports = router;