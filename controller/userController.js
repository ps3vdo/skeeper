const apiError = require("../error/apiError");
const crypto = require('crypto');
const db = require("../db");
const hashingPassword = require('../function/hashingPasssword');
const jwt = require('../function/jwt')

class UserController {
    async userCreate (req, res, next) {
        try {
            const {name, email, password} = req.body;

            const correctPassword = password.match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            if (!correctPassword) return next(apiError.badRequest("Password must contain A-Z,a-z,0-9,!@#$%^&*"));

            const correctEmail = email.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g);
            if (!correctEmail) return next(apiError.badRequest("incorrect email"));

            const duplicateEmail = await db.query('SELECT FROM users where email = $1', [email]);
            if (duplicateEmail.rowCount)   return next(apiError.badRequest('Email registered'));

            const salt = crypto.randomBytes(20).toString('hex');
            const hashPassword = hashingPassword(password, salt);
            const user = (await db.query('INSERT INTO users (name, email, hash_password, salt) values ($1, $2, $3, $4) RETURNING id, email',
                [name, email, hashPassword, salt])).rows[0];
            const title = "new spaces";
            await db.query('INSERT INTO spaces (title, id_owner) values($1, $2)',[title, user.id]);
            res.json(user); // Возвращает id, email
        } catch (e) {
            console.log(e);
            return next(apiError.badRequest(e.message));
        }
    }
    async userAuthorization(req, res, next){
        try {
            const { email, password } = req.body;

            const candidateEmail = await db.query('SELECT FROM users where email = $1', [email]);
            if (!candidateEmail.rowCount) {
                return next(apiError.badRequest('Email is not registered'));
            }

            const { salt, hash_password, id } =
                (await db.query('SELECT * FROM users where email = $1', [email])).rows[0];

            if (hashingPassword(password, salt) !== hash_password) {
                return next(apiError.badRequest('Password is bad'));
            }
            const token = jwt.generateToken(id, email);
            return res.json({ token });
        } catch (e) {
            console.log(e)
            return next(apiError.badRequest(e.message));
        }
    }
        async userDelete(req, res, next) {
            try {
                const id = req.params.id;
                console.log(id)
                const user = await db.query('DELETE FROM owner where id = $1', [id]);
                res.json(user.rows[0]);
            } catch (e) {
                console.log(e);
                return next(apiError.badRequest(e.message));
            }
        }
    async userUpdate(req, res, next) {
        try {
            const { name, email, id } = req.body;
            const user = await db.query(
                'UPDATE owner set name = $1, email = $2 where id = $3 RETURNING *',
                [name, email, id]);
            res.json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return next(apiError.badRequest(e.message));
        }
    }
    }
module.exports = new UserController();