const db = require('./db');

class notesServices {
	async create(title, text, id_space, id_owner, label, tags) {
		const currentDate = new Date();
		db.query('INSERT INTO notes (title, text, id_space, id_owner, label, tags, created_at, updated_at) VALUES $1, $2, $3, $4, $5, $6, $7, $7',
			[title, text, id_space, id_owner, label, tags, currentDate]);
		return 'ok'
	}

	async getAllOwner(id, limit, offset) {
		return await db.query('SELECT FROM notes WHERE id_owner = $1 LIMIT = $2 OFFSET = $3',
			[id, limit, offset]);
	}

	async update(title, text, label, tags) {
		const currentDate = new Date();
		await db.query('INSERT INTO notes (title, text, label, tags, updated_at) VALUES $1, $2, $3, $4, $5',
			[title, text, label, tags, currentDate]);
		return 'Successfully';
	}

	async deleteNote(id) {
		await db.query('DELETE FROM notes WHERE id = $1',
			[id]);
		return 'Note deleted'
	}
}

module.exports = new notesServices()