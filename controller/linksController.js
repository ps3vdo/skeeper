const LinksService = require('../db/links');

class LinksController {
	
	createLink(req, res, next) {
		const {id_owner, id_guest, id_target} = req.body;
		const newLink = LinksService.create(id_owner, id_guest, id_target);
		res.json(newLink);
	}

	createLink(req, res, next) {
		const id = req.params.id;
		const DeletedLink = LinksService.deleted(id);
			res.json(DeletedLink);
	}	
}
module.exports = new LinksController();