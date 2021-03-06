const db = require('db');

class UsersServices {
    async create (email, hash_password, salt, first_name, last_name) {
        const currentDate = new Date();
        return (await db.query('INSERT INTO users (email, hash_password, salt, first_name, last_name, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email',
            [email, hash_password, salt, first_name, last_name, currentDate])).rows[0];
    }
    async validate (email) {
        await db.query('SELECT FROM users where email = $1', [email]);
        return true;
    }


}

module.exports = new UsersServices()
