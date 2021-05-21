const express = require("express");
const config = require('./config');
const routes = require("./routes/index");
const errorMiddleware = require('./middleware/errorMiddleware')
const app = express();

const port = config.APP_PORT;

app.use(express.json());
app.use("/", routes);

app.use('/', errorMiddleware);

app.listen(port, function (){
    console.log("Server started on port:", port);//убить процесс использующий порт: fuser -k 5000/tcp
})