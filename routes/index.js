const Router = require('express');
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes');
const linksSpacesRoutes = require('./linksSpacesRoutes');
const linksNotesRoutes = require('./linksNotesRoutes');
const spacesRoutes = require('./spacesRoutes')

const router = new Router();

router.use('/', notesRoutes);
router.use('/', userRoutes);
router.use('/', linksSpacesRoutes);
router.use('/', linksNotesRoutes);
router.use('/', spacesRoutes);



module.exports = router;