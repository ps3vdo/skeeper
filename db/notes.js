const db = require('./db');
const ApiError = require('../error/ApiError')

class NotesServices {

	currentDate = new Date();

	async create(title, text, id_spaces, id_owner, label, tags) {
		try {
			await db.query('INSERT INTO notes (title, text, id_spaces, id_owner, label, tags, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
				[title, text, id_spaces, id_owner, label, tags, this.currentDate, this.currentDate]);
			return 'ok'
		} catch (e) {
			console.log(e.message);
			return ApiError.badRequest(e.message);
		}
	}

	async getAllOwner(id, limit, page) {
		page = page || 1;
		limit = limit || 5;
		let offset = page * limit - limit;
		return await db.query('SELECT * FROM notes WHERE id_owner = $1 LIMIT $2 OFFSET $3',
			[id, limit, offset]);
	}

	async update(title, text, label, tags) {
		await db.query('INSERT INTO notes (title, text, label, tags, updated_at) VALUES ($1, $2, $3, $4, $5)',
			[title, text, label, tags, this.currentDate]);
		return 'Successfully';
	}

	async deleteNote(id) {
		await db.query('DELETE FROM notes WHERE id = $1',
			[id]);
		return 'Note deleted'
	}
	async deleteNoteOfUser(id) {
	await db.query('DELETE FROM notes WHERE id_owner = $1',
	[id]);
	return 'Note deleted'
}
}

module.exports = new NotesServices()