const ApiError = require("../error/ApiError");
const crypto = require('crypto');
const db = require("../db/db");
const hashingPassword = require('../function/hashingPassword');
const jwtAccess = require('../function/tokenAccess');
const jwtRefresh = require('../function/tokenRefresh')
const {UsersServices, SpacesServices, NotesServices, LinksServices} = require('../db/index');

class UserController {
    async userCreate (req, res, next) {
        try {
            const {email, password, first_name, last_name} = req.body;

            const correctPassword = password
                .match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            if (!correctPassword) return next(ApiError
                .badRequest("Password must contain A-Z,a-z,0-9,!@#$%^&*"));

            const correctEmail = email
                .match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g);
            if (!correctEmail) return next(ApiError.badRequest("incorrect email"));//TODO заменить !

            const duplicateEmail = await UsersServices.validate(email);
            console.log(duplicateEmail)
            if (duplicateEmail.rowCount)   return next(ApiError.badRequest('Email registered'));

            const salt = crypto.randomBytes(20).toString('hex');
            const hashPassword = hashingPassword(password, salt);
            console.log(first_name, last_name)
            const user = await UsersServices.create(email, hashPassword, salt, first_name, last_name);
            await SpacesServices.create(user.id);
            const tokenAccess = jwtAccess.generateAccessToken(user.id, email);
            const tokenRefresh = jwtRefresh.generateRefreshToken(user.id, email);
            res.json({ tokenAccess, tokenRefresh, user }); // Возвращает id, email
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getOneUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await UsersServices.getUser(id);

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
            const users = await UsersServices.getUsers(limit, offset);
            res.json(users.rows)
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }
    async userAuthorization(req, res, next){
        try {
            const { email, password } = req.body;

            const validateEmail = await UsersServices.validate(email);
            if (!validateEmail) {
                return next(ApiError.badRequest('Invalid email or password'));
            }

            const { salt, hash_password, id } = UsersServices.validate(email);

            if (hashingPassword(password, salt) !== hash_password) {
                return next(ApiError.badRequest('Invalid email or password'));
            }
            const tokenAccess = jwtAccess.generateAccessToken(id, email);
            const tokenRefresh = jwtRefresh.generateRefreshToken(id, email);
            return res.json({ tokenAccess, tokenRefresh });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
        async userTokenRefresh(req, res) {
            let tokenRefresh =  req.headers.authorization; //не уверен в правильности получения
            const user = jwtRefresh.verifyRefreshToken(tokenRefresh); //TODO rework
            const tokenAccess = jwtAccess.generateAccessToken(user.id, user.email);
            tokenRefresh = jwtRefresh.generateRefreshToken(user.id, user.email);
            res.json({ tokenAccess,tokenRefresh })


        }
        async userDelete(req, res, next) {
            try {
                const id = req.params.id;
                console.log(id)
                await UsersServices.delete(id);
                await SpacesServices.delete(id);
                await NotesServices.deleteNoteOfUser(id);
                await LinksServices.deleteAllNotesOfUser(id);
                res.json("Successfully");
            } catch (e) {
                console.log(e);
                return next(ApiError.badRequest(e.message));
            }
        }
    async userUpdate(req, res, next) {
        try {
            const { first_name, last_name, email, id } = req.body;
            const user = await UsersServices.update(first_name, last_name, email, id);
            res.json(user.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    }
module.exports = new UserController();