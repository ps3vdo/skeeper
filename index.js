const express = require("express");
const config = require('./config');
const routes = require("./routes/index");
const errorMiddleware = require('./middleware/errorMiddleware');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ port: 8080});

const port = config.APP_PORT;

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
	});
	ws.send('comething');
});

app.use(express.json());
app.use("/api", routes);

app.use('/', errorMiddleware);

app.listen(port, function (){
    console.log("Server started on port:", port);//убить процесс использующий порт: fuser -k 5000/tcp
});