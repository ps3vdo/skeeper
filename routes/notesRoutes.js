const Router = require('express');
const notesController = require('../controller/notesController');

const router = Router();

router.get('/notes', notesController.getAll);
router.get('/notes_users/', notesController.getAllUserNotes);
router.post('/notes', notesController.createNote);
router.patch('/notes', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);
router.delete('/notes_users/:id', notesController.deleteNotesOfUser);

module.exports = router;