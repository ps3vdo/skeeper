const {linksNotesServices} = require('../db/index');
const ApiError = require('../error/ApiError')

class LinksNotesController {

    async create(req, res, next) {
        try {
            const {id_owner, id_guest, id_target} = req.body;
            const newLink = await linksNotesServices.create(id_owner, id_guest, id_target);
            res.json(newLink);
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const link = await linksNotesServices.getOneLink(id);
            res.json(link.rows[0]);
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const {page, limit} = req.params;
            const newLink = await linksNotesServices.getAll(page, limit);
            res.json(newLink.rows);
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const DeletedLink = await linksNotesServices.deleted(id);
            res.json(DeletedLink);
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new LinksNotesController();