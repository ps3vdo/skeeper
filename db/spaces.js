const db = require('./db');

class SpacesServices {

    currentDate = new Date();

    async create(id) {
        const title = 'new spaces'
        await db.query('INSERT INTO spaces (title, id_owner, created_at, updated_at) values($1, $2, $3, $3)',
            [title, id, this.currentDate]);
        return 'Ok'
    }
    async update(id, title) {
        return await db.query('UPDATE spaces set title = $1, updated_at = $2 where id = $3 RETURNING *',
            [title,  this.currentDate, id]);
    }
    async delete(id) {
        return await db.query('DELETE FROM spaces where id_owner = $1', [id]);
    }
}

module.exports = new SpacesServices();