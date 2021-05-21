const LinksService = require('../db/links');
const ApiError = require('../error/ApiError')

class LinksController {
	
	async create(req, res, next) {
		try {
			const {id_owner, id_guest, id_target} = req.body;
			const newLink = await LinksService.create(id_owner, id_guest, id_target);
			res.json(newLink);
		} catch (e) {
			console.log(e.message);
			return next(ApiError.badRequest(e.message))
		}
	}

	async delete(req, res, next) {
		try {
			const id = req.params.id;
			const DeletedLink = await LinksService.deleted(id);
			res.json(DeletedLink);
		} catch (e) {
			console.log(e.message);
			return next(ApiError.badRequest(e.message))
		}
	}
}
module.exports = new LinksController();