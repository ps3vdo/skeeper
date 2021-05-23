const {notesServices} = require('../db/index');
const ApiError = require('../error/ApiError')

	async function createNote(req, res, next) {
		try {
			const {title, text, id_spaces, id_owner, label = "", tags = ""} = req.body;
			await notesServices.create(title, text, id_spaces, id_owner, label, tags)
			res.json({message:"Note created"});
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message))
		}
	}
async function getAll(req, res, next) {
	try {
		let {page, limit} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		const notes = (await notesServices.getAll(limit, offset)); // нужно ли дублировать асинхронность(await), если в модуле это есть?
		res.json(notes.rows);
	} catch (e) {
		console.log(e);
		return next(ApiError.badRequest(e.message));
	}
}
	async function getAllUserNotes(req, res, next) {
		try {
		let {page, limit} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		const {id} = req.body; //TODO Уточнить момент передачи Ид пользователя/id всегда присутствует в req.user
		const notes = await notesServices.getAllUserNotes(id, limit, offset); // нужно ли дублировать асинхронность(await), если в модуле это есть?
		res.json(notes.rows);
	} catch (e) {
		console.log(e);
		return next(ApiError.badRequest(e.message));
	}
	}
	async function updateNote(req, res, next) {
		try {
		const {title, text, label, tags} = req.body;
		status = await notesServices.update(title, text, label, tags)
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}
	async function deleteNote(req, res, next) {
		try {
		const {id} = req.params.id;
		const status = await notesServices.deleteNote(id);
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}
	async function deleteNotesOfUser(req, res, next) {
		try {
		const {id} = req.params.id;
		const status = await notesServices.deleteNote(id);
		res.json(status);
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e.message));
		}
	}

module.exports = {getAll, createNote, getAllUserNotes, updateNote, deleteNote, deleteNotesOfUser}