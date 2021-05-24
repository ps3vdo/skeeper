const Router = require('express');
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes');
const linksRoutes = require('./linksRoutes');
const spacesRoutes = require('./spacesRoutes')

const router = new Router();

router.use('/', notesRoutes);
router.use('/', userRoutes);
router.use('/', linksRoutes);
router.use('/', spacesRoutes);



module.exports = router;