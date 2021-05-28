const jwtAccess = require('../function/tokenAccess');

function connectionHandler(ws, msg) {
	const {tokenAccess} = req.headers.authorization;
	if (!tokenAccess) ws.close('disconnect');
	const user = jwtAccess.verifyAccessToken(tokenAccess);/// реализовать аналогичную проверку для чата и заменить
	return user
}
function connectionSpace(ws, msg) {
	if (msg.space === ?) {
		ws.send(msg)
	}
	
}
const rooms = {};
const users = {};

function connection(ws) {


	ws.on('message', (msg) => {
		if (!msg) return;
		try {
		msg = JSON.parse(msg);
		} catch (e) {
			ws.send({
				type: "error",
				payload: {message: "invalid message"}
			})
		}
		switch (msg.method) {
			case "connection":
			connectionHandler(ws, msg);
			break;
			case "message":
			connectionSpace(ws, msg);
			
		}
		console.log(msg);
	});
	ws.send('');
};
///отправка из клиента
socket.send(JSON.stringify({
	message: "Hello",
	method: "connection",
	id: 2,
	username: "Qwerty",
	space: "2"
}))
socket.send(JSON.stringify({
	type: "connection",
	payload: {
	message: "Hello",
	id: 2,
	username: "Qwerty",
	space: "2"
	}
}))
