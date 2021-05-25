const db = require('./db');

const currentDate = new Date();

function create(title = 'new spaces', id_owner, description) {
    try {
        return db.query('INSERT INTO spaces (title, id_owner, description, created_at, updated_at) values($1, $2, $3, $4, $5)',
            [title, id_owner, description, currentDate, currentDate]);
    } catch (e) {
        return e.message
    }
}
function getUserSpace(id_owner) {
    try {
        return db.query('SELECT * FROM spaces where id_owner = $1',[id_owner]);
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
function getGuestSpace(id_target) {
    try {
        return db.query('SELECT spaces.title, spaces.id_owner, spaces.description, spaces.created_at, spaces.updated_at FROM links RIGHT OUTER JOIN spaces ON links.id_target = spaces_id WHERE id_guest = $1',[id_guest]);
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

module.exports = {create, update, deleteSpace, getUserSpace, getSpace, deleteUserSpace};