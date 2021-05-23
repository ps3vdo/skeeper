const db = require('./db');
const ApiError = require('../error/ApiError')


	const currentDate = new Date();
	
	async function create(id_owner, id_guest, id_target) {
		return (await db.query('INSERT INTO links (id_owner, id_guest, id_target, created_at) VALUES (' +
			'$1, $2, $3, $4) RETURNING *',
			[id_owner, id_guest, id_target, currentDate])).rows[0];
	}
	async function getOneLink(id) {
		return await db.query('SELECT * FROM links where id = $1', [id]);
	}
	async function getAll(page, limit) {
		try {
			page = page || 1;
			limit = limit || 5;
			let offset = page * limit - limit;
			return await db.query('SELECT * FROM links LIMIT $1 OFFSET $2', [limit, offset]);
		}catch (e) {
			return ApiError.badRequest(e.message);
		}
	}
	async function deleted(id) {
		return (await db.query('DELETE FROM links WHERE id = $1 RETURNING id', [id]));
	}
	async function deleteAllLinksOfUser(id_owner) {
		await db.query('DELETE FROM links WHERE id_owner = $1', [id_owner])
	}

module.exports = {create, getOneLink, getAll, deleted, deleteAllLinksOfUser}