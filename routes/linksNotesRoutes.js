const Router = require('express');
const linksNotesController = require('../controller/linksNotesController');

const router = new Router();

router.get('/links_notes', linksNotesController.getAll);
router.get('/links_notes/:id', linksNotesController.getOne);
router.post('/links_notes', linksNotesController.create);
router.delete('/links_notes/:id', linksNotesController.delete);

module.exports = router;
