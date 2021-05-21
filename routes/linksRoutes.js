const Router = require('express');
const linksController = require('../controller/linksController');

const router = new Router();

router.get('/links', linksController.getAll);
router.get('/links/:id', linksController.getOne);
router.post('/links', linksController.create);
router.delete('/links/:id', linksController.delete);

module.exports = router;
