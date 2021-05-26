const {spacesServices} = require('../db/index');
const ApiError = require('../error/ApiError');


async function createSpace (req, res, next) {
    try {
        const {id_owner, title, description} = req.body;
        await spacesServices.create(title, id_owner, description);
        res.json({"Space is created"})
    } catch (e) {
        console.log(e.message);
        return next(ApiError.badRequest(e.message));
    }
}
async function getSpace (req, res, next) {
    try {
        const user = req.body;
		const {type, page, limit} = req.query;
		page = page || 1;
		limit = limit || 9;
		const offset = page * limit - limit;
		let space = [];
		switch(type) {
		case 'me': space = (await spacesServices.getUserSpaces(user.id, limit, offset)).rows;
		break;
		case 'shared': space = (await spacesServices.getGuestSpaces(user.id, limit, offset)).rows;
		break;
		case 'all':
		break;
		}

        res.json(space);
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
async function getUserSpace (req, res, next) {
    try {
        const id = req.params.id;
        const space = await spacesServices.getUserSpaces(id);
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

module.exports = {createSpace, deleteSpace, updateSpace, getUserSpace}

