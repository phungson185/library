const express = require("express");
const cors = require('cors');

const router = require('./routers/router');
const api = require('./routers/api');

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('views/csdl/127.0.0.1/wordpress'));

app.use(cors());

app.use('/',router);
app.use('/api',api);

let server = app.listen(3000,() => {
    console.log(server.address());
})