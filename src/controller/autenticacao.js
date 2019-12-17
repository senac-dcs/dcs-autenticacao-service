const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

exports.verificaToken = async (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Por favor, insira o token.");
    else {
        let usuarioDecoded;
        try {
            usuarioDecoded = jwt.verify(token, process.env.SECRET);
            usuarioEncontrato = await Usuario.findById({ _id: ObjectId(usuarioDecoded.id) });

            if(usuarioEncontrato.role == "admin") {
                res.status(200).json({
                    user: usuarioEncontrato
                })
            }
            else {
                res.status(401).json({
                    messageError: 'Não autorizado'
                })
            }
        } catch(err) {
            res.status(401).send(err);
        }
    }
}

exports.autentica = async (req, res, next) => {

    let usuarioEncontrado;

    try {
        usuarioEncontrado = await Usuario.findOne({ email: req.body.email })
        if (usuarioEncontrado !== null) {
            if (bcrypt.compareSync(req.body.password, usuarioEncontrado.password)) {
                const token = jwt.sign(
                    {id: usuarioEncontrado.id}, process.env.SECRET, {expiresIn: '1h'}
                );
                res.status(200).json({
                    data: {
                        token: token
                    }
                });
            }
            else {
                res.status(422).json({
                    messageError: 'Email ou password inválido.',
                });
            }
        }
        else {
            res.status(422).json({
                messageError: 'Usuário não encontrado.'
            })
        }
    } catch (err) {
        next(err);
    }
}