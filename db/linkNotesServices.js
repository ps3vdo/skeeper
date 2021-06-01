const db = require('./db');
const ApiError = require('../error/ApiError')

const currentDate = new Date();

async function create(id_owner, id_guest, id_target) {
    return (await db.query('INSERT INTO link_notes (id_owner, id_guest, id_target, created_at) VALUES (' +
        '$1, $2, $3, $4) RETURNING *',
        [id_owner, id_guest, id_target, currentDate])).rows[0];
}

async function getOneLink(id) {
    return await db.query('SELECT * FROM link_notes where id = $1', [id]);
}

async function getAll(limit, offset) {
    try {
        return await db.query('SELECT * FROM link_notes LIMIT $1 OFFSET $2', [limit, offset]);
    } catch (e) {
        return ApiError.badRequest(e.message);
    }
}

async function deleted(id) {
    return (await db.query('DELETE FROM link_notes WHERE id = $1 RETURNING id', [id]));
}

async function deleteAllLinksOfUser(id_owner) {
    await db.query('DELETE FROM link_notes WHERE id_owner = $1', [id_owner])
}

module.exports = {create, getOneLink, getAll, deleted, deleteAllLinksOfUser}