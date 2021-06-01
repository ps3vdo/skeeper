const express = require("express");
const config = require('./config');
const routes = require("./routes/index");
const errorMiddleware = require('./middleware/errorMiddleware');
const WebSocket = require('ws');
const connection = require('./controller/wsController')

const app = express();

const port = config.APP_PORT;
const wsPort = config.WS_PORT;

const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', connection);

app.use(express.json());
app.use("/api", routes);

app.use('/', errorMiddleware);

app.listen(port, function (){
    console.log("Server started on port:", port);//убить процесс использующий порт: fuser -k 5000/tcp
});