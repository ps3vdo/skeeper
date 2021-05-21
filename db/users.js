const db = require('./db');
const apiError = require('../error/ApiError')

class UsersServices {

    currentDate = new Date();

    async create (email, hash_password, salt, first_name, last_name) {
        try {
            return (await db.query('INSERT INTO users (email, hash_password, salt, first_name, last_name, created_at) values ($1, $2, $3, $4, $5, $6) RETURNING id, email',
                [email, hash_password, salt, first_name, last_name, this.currentDate])).rows[0];
        } catch (e) {
            return apiError.badRequest(e.message);
        }
    }

    async getUser(id) {
        try {
            return await db.query('SELECT * FROM users where id = $1', [id]);
        } catch (e) {
            return apiError.badRequest(e.message);
        }
    }

    async getUsers(limit, page) {
        try {
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;
            return await db.query('SELECT * FROM users LIMIT $1 OFFSET $2', [limit, offset]);
        } catch (e) {
            return apiError.badRequest(e.message);
        }
    }

    async validate (email) {
        try {
            return await (db.query('SELECT FROM users where email = $1', [email]));
        } catch (e) {
            return apiError.badRequest(e.message);
        }
    }

    async createRefreshToken(id, token) {//TODO запись токена в бд
    }

    async update(first_name, last_name, email, id) {
        return await db.query('UPDATE users set first_name = $1, last_name = $2, email = $3, updated_at = $4 where id = $5 RETURNING *',
            [first_name, last_name, email,  this.currentDate, id]);

    }
    async delete(id) {
        return await db.query('DELETE FROM users where id = $1', [id]);
    }
}

module.exports = new UsersServices();
