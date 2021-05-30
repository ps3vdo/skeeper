const {spacesServices} = require('../db/index');
const ApiError = require('../error/ApiError');

async function createSpace (req, res, next) {
    try {
        const {id_owner, title, description} = req.body;
        await spacesServices.create(id_owner, title, description);
        res.json('Space created')
    } catch (e) {
        console.log(e);
        return next(ApiError.badRequest(e.message));
    }
}
async function getSpaces (req, res, next) {
    try {
        const user = req.body;
		let {type, page, limit} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
		let spaceUser, spaceGuest;
		switch(type) {
		case 'me': spaceUser = (await spacesServices.getUserSpace(user.id, limit, offset)).rows;
		break;
		case 'shared': spaceGuest = (await spacesServices.getGuestSpace(user.id, limit, offset)).rows;
		break;
		case 'all':
            spaceUser = (await spacesServices.getUserSpace(user.id, limit, offset)).rows;
            spaceGuest = (await spacesServices.getGuestSpace(user.id, limit, offset)).rows;
		break;
		}
        res.json({spaceUser, spaceGuest});
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}
async function getOneSpace (req, res, next) {
    try {
        const id = req.params.id;
        const space = await spacesServices.getSpace(id);
        res.json(space.rows[0]);
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}
async function getAllSpaces (req, res, next) {
    try {
        let {page, limit} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const space = await spacesServices.getAllSpace(limit, offset);
        res.json(space.rows);
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}
async function updateSpace (req, res, next) {
    try {
        const {id, title, description} = req.body;
        await spacesServices.update(id, title, description);
        res.json({message:"Update successfully"});
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}
async function deleteSpace (req, res, next) {
    try {
        const id = req.params.id;
        const spaceExist = (await spacesServices.getSpace(id)).rowCount
        if (!spaceExist) res.status(400).json({message:"Space not found"});
        const {title} = (await spacesServices.deleteSpace(id)).rows[0];//TODO если пусто
        res.json({message:"Deleted", title});
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}

module.exports = {createSpace, deleteSpace, updateSpace, getOneSpace, getSpaces, getAllSpaces}

