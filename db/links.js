const db = require('./db');

class LinksService {
	
	currentDate = new Date();
	
	async create(id_owner, id_guest, id_target) {	
		return (await db.query('INSERT INTO links (id_owner, id_guest, id_target, created_at) VALUES $1, $2, $3, $4 RETURN *',
		[id_owner, id_guest, id_target, this.currentDate])).rows[0];	
	}
	
	async deleted(id) {
		return (awaid db.query('DELETE FROM links WHERE id = $1 RETURNING id', [id]));
	}
}
module.exports = new LinksService();