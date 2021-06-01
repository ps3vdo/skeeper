const db = require('./db');
const ApiError = require('../error/ApiError');

async function addToken(token) {
    try {
        await db.query('INSERT INTO token (refresh_token) VALUES ($1)', [token]);
    } catch (e) {
        return ApiError.badRequest(e.message)
    }
}

async function getToken(token) {
    try {
        return db.query('SELECT * FROM token WHERE refresh_token = $1', [token]);
    } catch (e) {
        return ApiError.badRequest(e.message)
    }
}

async function deleteToken(token) {
    try {
        await db.query('DELETE FROM token WHERE refresh_token = $1', [token]);
    } catch (e) {
        return ApiError.badRequest(e.message)
    }
}

module.exports = {addToken, getToken, deleteToken}