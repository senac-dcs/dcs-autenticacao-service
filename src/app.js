const express = require('express');
const app = express();

var port = process.env.PORT || 3001;

const authController = require('./controller/authentication');

app.listen(port, () => {
    console.log('Listen to port 3000')
});