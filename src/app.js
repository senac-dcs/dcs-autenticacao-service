const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();
app.use(morgan('combined'));

var port = process.env.PORT || 3001;

const usuarioDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST_REMOTE}/usuarios`;
const localDB = `mongodb://${process.env.DB_HOST_LOCAL}:${process.env.DB_PORT_LOCAL}/usuarios`;

mongoose.connect(usuarioDB, 
    { useNewUrlParser: true }
  );

const autenticacaoRoute = require('./routes/autenticacao');
const usuarioRoute = require('./routes/usuario');

app.use(cors());
app.use(bodyParser.json());

app.use('/autenticacao', autenticacaoRoute)
app.use('/usuarios', usuarioRoute)

app.listen(port, () => {
    console.log(`Listen to port ${port}`)
});