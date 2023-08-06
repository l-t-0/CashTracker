

const express = require('express')
const cors = require('cors');
import path from 'path';
const {database} = require('./database/database');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

//password = 2WKxQ8ozQqdl4pgt
//middlewares
app.use(express.json())
app.use(cors())

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req,res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html')));


const PORT = process.env.PORT

const server = () => {
    database()
    app.listen(PORT, () => {
        console.log('Listening to port ', PORT)
    })
}

server()