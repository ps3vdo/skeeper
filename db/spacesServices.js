const db = require('./db');

const currentDate = new Date();

function create(id, title = 'new spaces', description) {
    try {
        return db.query('INSERT INTO spaces (title, id_owner, description, created_at) values($1, $2, $3, $4)',
            [title, id, description, currentDate]);
    } catch (e) {
        return e
    }
}
function getUserSpace(id_owner, limit, offset) {
    try {
        return db.query('SELECT * FROM spaces where id_owner = $1 LIMIT $2 OFFSET $3',[id_owner, limit, offset]);
    } catch (e) {
        return e.message
    }
}
function getSpace(id) {
    try {
        return db.query('SELECT * FROM spaces where id = $1',[id]);
    } catch (e) {
        return e.message
    }
}
function getAllSpace(limit, offset) {
    try {
        return db.query('SELECT * FROM spaces LIMIT $1 OFFSET $2',[limit, offset]);
    } catch (e) {
        return e.message
    }
}
function getGuestSpace(id_guest, limit, offset) {
    try {
        return db.query('SELECT * FROM links RIGHT OUTER JOIN spaces ON links.id_target = spaces.id WHERE id_guest = $1 LIMIT $2 OFFSET $3',[id_guest, limit, offset]);
    } catch (e) {
        return e.message
    }
}
async function update(id, title, description) {
    try {
        await db.query('UPDATE spaces set title = $1, updated_at = $2, description = $3 where id = $4',
            [title,  currentDate, description, id]);
    } catch (e) {
        return e.message
    }
}
function deleteUserSpace(id) {
    try {
        return  db.query('DELETE FROM spaces where id_owner = $1 RETURNING title', [id]);
    } catch (e) {
        return e.message
    }
}
function deleteSpace(id) {
    try {
        return  db.query('DELETE FROM spaces where id = $1 RETURNING title', [id]);
    } catch (e) {
        return e.message
    }
}

module.exports = {create, update, deleteSpace, getAllSpace, getUserSpace, getSpace, deleteUserSpace, getGuestSpace};