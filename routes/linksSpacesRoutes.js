const Router = require('express');
const linksController = require('../controller/linksSpacesController');

const router = new Router();

router.get('/links_spaces', linksController.getAll);
router.get('/links_spaces/:id', linksController.getOne);
router.post('/links_spaces', linksController.create);
router.delete('/links_spaces/:id', linksController.delete);

module.exports = router;
