const db = require('./db');
const apiError = require('../error/ApiError');

const currentDate = new Date();

async function create (email, hash_password, salt, first_name, last_name) {
    try {
        return db.query('INSERT INTO users (email, hash_password, salt, first_name, last_name, created_at) values ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, hash_password, salt, first_name, last_name, currentDate]);
    } catch (e) {
        return apiError.badRequest(e.message);
    }
}
async function getUser(id) {
    try {
        return db.query('SELECT * FROM users where id = $1', [id]);
    } catch (e) {
        return apiError.badRequest(e.message);
    }
}
async function getUsers(limit, page) {
    try {
        page = page || 1;
        limit = limit || 5;
        let offset = page * limit - limit;
        return db.query('SELECT * FROM users LIMIT $1 OFFSET $2', [limit, offset]);
    } catch (e) {
        return apiError.badRequest(e.message);
    }
}
async function validate (email) {
    try {
        console.log(email)
        return db.query('SELECT * FROM users where email = $1', [email]);
    } catch (e) {
        return apiError.badRequest(e.message);
    }
}
async function update(first_name, last_name, email, id) {
    return db.query('UPDATE users set first_name = $1, last_name = $2, email = $3, updated_at = $4 where id = $5 RETURNING *',
        [first_name, last_name, email,  currentDate, id]);

}
async function deleteUser(id) {
    return db.query('DELETE FROM users where id = $1', [id]);
}

module.exports = {create, getUser, getUsers, validate, update, deleteUser}
