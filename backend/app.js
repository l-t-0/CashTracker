

const express = require('express')
const cors = require('cors');
const path = require('path');
const {database} = require('./database/database');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

//password = 2WKxQ8ozQqdl4pgt
//middlewares
app.use(express.json())
app.use(cors())

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).map((route) => {
    app.use('/api/v1', require(path.join(routesPath, route)));
});

const dname = path.resolve();

app.use(express.static(path.join(dname, '/frontend/build')));

app.get('*', (req,res) =>
    res.sendFile(path.join(dname, '/frontend/build/index.html')));


const PORT = process.env.PORT

const server = () => {
    database()
    app.listen(PORT, () => {
        console.log('Listening to port ', PORT)
    })
}

server()