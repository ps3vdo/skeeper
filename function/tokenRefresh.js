const config = require('../config');
const crypto = require('crypto');
const apiError = require('../error/apiError')

function validate(oneString, twoString) {
    const tokenWithOut = oneString + "." + twoString;
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
    const oneString = Buffer.from(JSON.stringify(header)).toString("base64");
    const twoString = Buffer.from(JSON.stringify(payload)).toString("base64");
    const treeString = validate(oneString, twoString);
    return oneString + "." + twoString + "." + treeString;
}
const verifyRefreshToken = function (token) {
    token = token.split(' ')[1];
    const [oneString, twoString, verify] = token.split('.');
    const decryptString = Buffer.from(twoString, "base64").toString()
    const decoded = JSON.parse(decryptString);
    const treeString = validate(oneString, twoString);
    if (treeString !== verify) return apiError.forbidden("You don't have access");
    if (decoded.expires_at < Date.now()) return apiError.forbidden("Re-authorization required");
    return decoded;
}

module.exports = {generateRefreshToken, verifyRefreshToken};