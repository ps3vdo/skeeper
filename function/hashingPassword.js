const crypto = require('crypto');

function hashingPassword(password, salt) {
    return crypto.pbkdf2Sync(password, Buffer
        .from(salt, "hex"), 10000, 64, "sha512")
        .toString("hex");
}

module.exports = hashingPassword;