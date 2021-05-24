const ApiError = request('../error/apiError');

function authorization(req, res, next) {
	try{
	const {tokenAccess} = req.headers.authorization;
	
	if (!tokenAccess) res(ApiError.forbidden("Not authorization"));

	const user = verifyAccessToken(tokenAccess);
	next();		
	} catch(e) {
		console.log(e.message);
		res.json(ApiError.forbidden("Not authorization"));	
	}
}
module.exports = authorization;