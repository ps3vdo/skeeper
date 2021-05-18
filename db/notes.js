const db = require('db');
	
const currentDate = new Date();
	
function create(title, text, id_space, id_owner, label, tags) {

	db.query('INSERT INTO notes (title, text, id_space, id_owner, label, tags, created_at, updated_at) VALUES $1, $2, $3, $4, $5, $6, $7, $7',
		[title, text, id_space, id_owner, label, tags, currentDate]);
	return 'ok'
}
function getAllOwner(id, limit, offset) {
	return (db.query('SELECT FROM notes WHERE id_owner = $1 LIMIT = $2 OFFSET = $3',
		[id, limit, offset]));
}
function update(title, text, label, tags) {
	db.query('INSERT INTO notes (title, text, label, tags, updated_at) VALUES $1, $2, $3, $4, $5',
		[title, text, label, tags, currentDate]);
	return 'Successfully';
}
function deleteNote(id) {
	db.query('DELETE FROM notes WHERE id = $1',
		[id]);
	return  'Note deleted'
}