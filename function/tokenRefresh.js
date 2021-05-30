const config = require('../config');
const crypto = require('crypto');
const apiError = require('../error/ApiError')

function createVerifySignature(header, payload) {
    const tokenWithOut = header + "." + payload;
    return crypto.createHmac('sha256', config.SECRET_REFRESH)
        .update(tokenWithOut).digest('hex');

}
const generateRefreshToken = (id, email) => {
    const header = {
        "alg": "HS256",
        "typ": "JWT",
        "type": "tokenRefresh"
    }
    const payload = {
        id,
        email,
        expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000
    }
    const firstString = Buffer.from(JSON.stringify(header)).toString("base64");
    const secondString = Buffer.from(JSON.stringify(payload)).toString("base64");
    const verifySignature = createVerifySignature(header, payload);
    return firstString + "." + secondString + "." + verifySignature;
}
const verifyRefreshToken = function (token) {
    const [header, payload, verify] = token.split('.');
    const decryptString = Buffer.from(payload, "base64").toString();
    const decoded = JSON.parse(decryptString);
	
    if (decoded.expires_at < Date.now()) return apiError.forbidden("Re-authorization required");
	
    return decoded;
}

module.exports = {generateRefreshToken, verifyRefreshToken};