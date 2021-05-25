const Router = require('express');
const spaceController = require('../controller/spaceController');

const router = Router();

router.get('/space/:id', spaceController.getUserSpace);
router.get('/get_spaces', spaceController.getSpace);
router.post('/spaces', spaceController.createSpace);
router.patch('/spaces', spaceController.updateSpace);
router.delete('/spaces/:id', spaceController.deleteSpace);

module.exports = router;