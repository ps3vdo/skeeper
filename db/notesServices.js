const db = require('./db');
const ApiError = require('../error/ApiError');

const currentDate = new Date();

async function create(title, text, id_spaces, id_owner, label, tags) {
	try {
		await db.query('INSERT INTO notes (title, text, id_spaces, id_owner, label, tags, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
			[title, text, id_spaces, id_owner, label, tags, currentDate, currentDate]);
	} catch (e) {
		console.log(e.message);
		return ApiError.badRequest(e.message);
	}
}
async function getAll(limit, page) {
	page = page || 1;
	limit = limit || 5;
	let offset = page * limit - limit;
	return db.query('SELECT * FROM notes LIMIT $1 OFFSET $2',
		[limit, offset]);
}
async function getAllUserNotes(id, limit, page) {
	page = page || 1;
	limit = limit || 5;
	let offset = page * limit - limit;
	return db.query('SELECT * FROM notes WHERE id_owner = $1 LIMIT $2 OFFSET $3',
		[id, limit, offset]);
}

async function update(title, text, label, tags) {
	return db.query('INSERT INTO notes (title, text, label, tags, updated_at) VALUES ($1, $2, $3, $4, $5)',
		[title, text, label, tags, currentDate]);
}

async function deleteNote(id) {
	try {
		return db.query('DELETE FROM notes WHERE id = $1 RETURNING title', [id]);
	} catch (e) {
		console.log(e.message);
		return ApiError.badRequest(e.message);
	}
}
async function deleteNotesOfUser(id) {
	try {
	await db.query('DELETE FROM notes WHERE id_owner = $1',
		[id]);
} catch (e) {
	console.log(e.message);
	return ApiError.badRequest(e.message);
}
}

module.exports = {deleteNotesOfUser, deleteNote, update, getAll, getAllUserNotes, create}