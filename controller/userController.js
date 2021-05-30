const ApiError = require("../error/ApiError");
const crypto = require('crypto');
const hashingPassword = require('../function/hashingPassword');
const jwtAccess = require('../function/tokenAccess');
const jwtRefresh = require('../function/tokenRefresh')
const {usersServices, spacesServices, notesServices,
linksServices, tokenServices} = require('../db/index');


class UserController {
    async userCreate (req, res, next) {
        try {
            const {password, first_name, last_name} = req.body;
            let {email} = req.body
            email = email.toLowerCase();

            const correctPassword = password
                .match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            if (!correctPassword) return next(ApiError
                .badRequest("Password must contain A-Z,a-z,0-9,!@#$%^&*"));

            const correctEmail = email
                .match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g);
            if (!correctEmail) return next(ApiError.badRequest("incorrect email"));//TODO заменить !

            const duplicateEmail = await usersServices.validate(email);
            if (duplicateEmail.rowCount)   return next(ApiError.badRequest('Email registered'));

            const salt = crypto.randomBytes(20).toString('hex');
            const hashPassword = hashingPassword(password, salt);

            const user = await usersServices.create(email, hashPassword, salt, first_name, last_name);
            await spacesServices.create(user.rows[0].id);
            const tokenAccess = jwtAccess.generateAccessToken(user.rows[0].id, email);
            const tokenRefresh = jwtRefresh.generateRefreshToken(user.rows[0].id, email);
			await tokenServices.addToken(tokenRefresh);
            console.log(tokenAccess, tokenRefresh);
            res.json({ tokenAccess, tokenRefresh });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
    async getOneUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await usersServices.getUser(id);

            if(!user.rowCount) res.json("User is not registered");

            res.json(user.rows[0]);

        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getUsers(req, res, next) {
        try {
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;
            const users = await usersServices.getUsers(limit, offset);
            res.json(users.rows)
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }
    async userAuthorization(req, res, next){
        try {
            let { email, password } = req.body;
            email = email.toLowerCase();
            const user = (await usersServices.validate(email)).rows[0];
            if (!user) {
                return next(ApiError.badRequest('Invalid email or password!'));
            }

            if (hashingPassword(password, user.salt) !== user.hash_password) {
                return next(ApiError.badRequest('Invalid email or password'));
            }

            const tokenAccess = jwtAccess.generateAccessToken(user.id, email);
            const tokenRefresh = jwtRefresh.generateRefreshToken(user.id, email);
            await tokenServices.deleteToken(tokenRefresh);
            await tokenServices.addToken(tokenRefresh);
            return res.json({ tokenAccess, tokenRefresh });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
    async checkTokenRefresh(req, res, next) {
        try {
            let tokenRefresh = req.headers.authorization;//не уверен в правильности получения
            tokenRefresh = tokenRefresh.split(' ')[1];
            const validateToken = await tokenServices.getToken(tokenRefresh);
            if (!validateToken.rowCount) return next(ApiError.badRequest('Re-authorization required'));
            console.log("tut")
            const user = jwtRefresh.verifyRefreshToken(tokenRefresh);
            const tokenAccess = jwtAccess.generateAccessToken(user.id, user.email);
            await tokenServices.deleteToken(tokenRefresh);
            tokenRefresh = jwtRefresh.generateRefreshToken(user.id, user.email);
            await tokenServices.addToken(tokenRefresh);
            res.json({tokenAccess, tokenRefresh});
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
    async userDelete(req, res, next) {
        try {
            const id = req.params.id;
            console.log(id);
            await linksServices.deleteAllLinksOfUser(id);
            await notesServices.deleteNotesOfUser(id);
            await spacesServices.deleteUserSpace(id);
            await usersServices.deleteUser(id);
            res.json({message:"Successfully"});
        } catch (e) {
                console.log(e);
                return next(ApiError.badRequest(e.message));
        }
    }
    async userUpdate(req, res, next) {
        try {
            const { first_name, last_name, email, id } = req.body;
            const user = await usersServices.update(first_name, last_name, email, id);
            res.json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new UserController();