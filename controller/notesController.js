const {NotesServices} = require('../db/index');
const ApiError = require('../error/ApiError')

class NotesController {
	async createNote(req, res, next) {
		try {
			const {title, text, id_spaces, id_owner, label = "", tags = ""} = req.body;
			const status = await NotesServices.create(title, text, id_spaces, id_owner, label, tags)
			res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message))
		}
	}
	async getAllOwnerNotes(req, res, next) {
		try {
		let {page, limit} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		const {id} = req.body; //Уточнить момент передачи Ид пользователя/id всегда присутствует в req.user
		const notes = await NotesServices.getAllOwner(id, limit, offset); // нужно ли дублировать асинхронность(await), если в модуле это есть?
		res.json(notes.rows);
	} catch (e) {
		console.log(e);
		return next(ApiError.badRequest(e.message));
	}
	}
	async updateNote(req, res, next) {
		try {
		const {title, text, label, tags} = req.body;
		status = await NotesServices.update(title, text, label, tags)
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}
	async deleteNote(req, res, next) {
		try {
		const {id} = req.params.id;
		const status = await NotesServices.deleteNote(id);
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}
	async deleteNoteOfUser(req, res, next) {
		try {
		const {id} = req.params.id;
		const status = await NotesServices.deleteNote(id);
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}
}

module.exports = new NotesController();