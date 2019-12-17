var express = require('express');
var router = express.Router();

var autenticacaoController = require('../controller/autenticacao');

router.route('/autentica')
    .post(autenticacaoController.autentica);

router.route('/verifica')
    .post(autenticacaoController.verificaToken);

module.exports = router;
