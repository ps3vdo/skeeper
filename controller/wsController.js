const jwtAccess = require('../function/tokenAccess');

function connectionHandler(ws, token) {
    if (!token) ws.close('disconnect');
    const user = jwtAccess.verifyAccessToken(token);
    return user //id,email
}
function connectionSpace(ws, msg) {
    if (msg.space === 0) {
        ws.send(msg)
    }

}
const rooms = [];
const users = [];

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
                const {payload:{token, roomId}} = data
                const user = connectionHandler(ws, token);
                rooms.push(user);
                break;

            case "message":
                connectionSpace(ws, data);

        }
        console.log(data);
    });
    ws.send('');
};
module.exports = connection;
///отправка из клиента
// socket.send(JSON.stringify({
//     ty"pe: "connection",
//     "payload": {
//         "message": "Hello",
//         id: 2,
//         "username": "Qwerty",
//         "space": "2"
//     }
//
// }));