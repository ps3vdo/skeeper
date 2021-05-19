const db = require('db');

class SpacesServices {
    async create(id) {
        const title = 'new spaces'
        const currentDate = new Date();
        await db.query('INSERT INTO spaces (title, id_owner, created_at, updated_at) values($1, $2, $3, $3)',
            [title, id, currentDate]);
        return 'Ok'
    }
}

module.exports = new SpacesServices();