const jwtAccess = require('../function/tokenAccess');

function connectionHandler(ws, token) {
    try {
        if (!token) {
            ws.send(JSON.stringify({
                type: "error",
                payload: {message: "Not authorized"},
            }))
            ws.close();
        }
        const user = jwtAccess.verifyAccessToken(token);
        return user //id,email
    } catch (e) {
        ws.send(JSON.stringify(e.message));
        console.log(e.message)
    }
}

const rooms = {};
const users = {};

function connection(ws) {

    ws.on('message', (data) => {
        if (!data) return;
        try {
            data = JSON.parse(data);
        } catch (e) {
            ws.send(JSON.stringify({
                type: "error",
                payload: {message: "invalid message"}
            }));
        }

        switch (data.type) {
            case "connect":
                const {payload:{token}} = data;
                const user = connectionHandler(ws, token);
                users[user.id] = user;
                break;
            case "subscribe": {
                const {payload: {roomId, userId}} = data;

                if (!users[userId]) {
                    ws.send(JSON.stringify({
                        type: "error",
                        payload: {message: "Not authorized"},
                    }));
                    ws.close();
                    return;
                }
                if (!rooms[roomId]) rooms[roomId] = [];
                rooms[roomId].push(ws);
                break;
            }
            case "message": {
                const { payload: { message, roomId }} = data;

                if (!rooms[roomId]) {
                    ws.send(JSON.stringify({
                        type: "error",
                        payload: { message: "not found rooms" },
                    }));
                    return;
                }

                rooms[roomId].forEach(item => {
                    item.send(message);
                });
            }
                break;
            default:
                break;
        }
    });
};
module.exports = connection;
/*отправка из клиента
socket.send(JSON.stringify({
    "type": "connect",
    "payload": {
        "message": "Hello",
        userId: 2,
        "username": "Qwerty",
        "space": "2"
    }
//
// }));*/