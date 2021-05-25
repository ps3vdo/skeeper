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
        "typ": "JWT"
    }
    const payload = {
        id,
        email,
        expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000
    }
    const header = Buffer.from(JSON.stringify(header)).toString("base64");
    const payload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const verifySignature = createVerifySignature(header, payload);
    return header + "." + payload + "." + verifySignature;
}
async const verifyRefreshToken = function (token) {
    token = token.split(' ')[1];
    const [header, payload, verify] = token.split('.');
    const decryptString = Buffer.from(payload, "base64").toString();
    const decoded = JSON.parse(decryptString);
	
    if (decoded.expires_at < Date.now()) return apiError.forbidden("Re-authorization required");
	
    return {decoded.id, decoded.email};
}

module.exports = {generateRefreshToken, verifyRefreshToken};