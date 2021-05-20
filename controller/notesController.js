const {notesService} = require('../db/index');

class notesController {
	async createNote(req, res) {
		const {title, text, id_space, id_owner, label = "", tags = ""} = req.body;
		status = await notesService.create(title, text, id_space, id_owner, label, tags)
		res.json(status);
	}
	async getAllOwnerNotes(req, res) {
		let {page, limit} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		const {id} = req.user; //Уточнить момент передачи Ид пользователя/id всегда присутствует в req.user
		const notes = await notesService.getAllOwner(id, limit, offset); // нужно ли дублировать асинхронность(await), если в модуле это есть?
		res.json(notes.rows);
	}
	async updateNote(req, res) {
		const {title, text, label, tags} = req.body;
		status = await notesService.update(title, text, label, tags)
		res.json(status);
	}
	async deleteNote(req, res) {
		const {id} = req.params.id;
		const status = await notesService.deleteNote(id);
		res.json(status);
	}
	async deleteNoteOfUser(req, res) {
		const {id} = req.params.id;
		const status = await notesService.deleteNote(id);
		res.json(status);
	}
}

module.exports = new notesController();