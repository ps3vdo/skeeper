const db = require('./db');
const ApiError = require('../error/ApiError')

class LinksServices {
	
	currentDate = new Date();
	
	async create(id_owner, id_guest, id_target) {	
		return (await db.query('INSERT INTO links (id_owner, id_guest, id_target, created_at) VALUES (' +
			'$1, $2, $3, $4) RETURNING *',
			[id_owner, id_guest, id_target, this.currentDate])).rows[0];
	}
	async getOneLink(id) {
		return await db.query('SELECT * FROM links where id = $1', [id]);
	}
	async getAll(page, limit) {
		try {
			page = page || 1;
			limit = limit || 5;
			let offset = page * limit - limit;
			return await db.query('SELECT * FROM links LIMIT $1 OFFSET $2', [limit, offset]);
		}catch (e) {
			return ApiError.badRequest(e.message);
		}
	}
	async deleted(id) {
		return (await db.query('DELETE FROM links WHERE id = $1 RETURNING id', [id]));
	}
	async deleteAllNotesOfUser(id_owner) {
		await db.query('DELETE FROM links WHERE id_owner = $1', [id_owner])
	}
}

module.exports = new LinksServices();