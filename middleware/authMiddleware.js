const ApiError = request('../error/apiError');
const tokenAccessVerify = request('../function/tokenAccess')

function authorization(req, res, next) {
	try{
		const {tokenAccess} = req.headers.authorization;
	
		if (!tokenAccess) res(ApiError.forbidden("Not authorization"));

		const user = tokenAccessVerify.verifyAccessToken(tokenAccess);
		next(user);
	} catch(e) {
		console.log(e.message);
		res.json(ApiError.forbidden("Not authorization"));	
	}
}

module.exports = authorization;