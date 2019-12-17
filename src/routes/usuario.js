const express = require('express');
const router = express.Router();

const usuario = require('../controller/usuario');

router.route('/')
    .post(usuario.createUser)
    .get(usuario.getAll);

router.route('/:id')
    .get(usuario.getUserById)
    .put(usuario.updateUser)
    .delete(usuario.removeUsuario);

router.route('/search')
    .get(usuario.getUserByEmail);

module.exports = router;
