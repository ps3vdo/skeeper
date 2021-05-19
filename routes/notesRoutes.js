const Router = require('express');
const notesController = require('../controller/notesController');

const router = Router();

router.get('/notes', notesController.getAllOwnerNotes);
router.post('/notes', notesController.createNote);
router.put('/notes', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;