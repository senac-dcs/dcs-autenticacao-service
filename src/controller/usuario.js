const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;

exports.getAll = async (req, res, next) => {
    let usuarios;

    try {
        usuarios = await Usuario.find({})
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(200).send(usuarios);
}

exports.getUserByEmail = async (req, res, next) => {
    let usuario;
    try {
        usuario = await Usuario.find({ email: req.query.email })
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(200).json(usuario);
}

exports.getUserById = async (req, res, next) => {
    let usuario;
    try {
        usuario = await Usuario.findById({ _id: ObjectId(req.params.id) })
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(200).json(usuario);
}

exports.updateUser = async (req, res, next) => {
    let usuarioAtualizado;

    try {
        usuarioAtualizado = await Usuario
            .findOneAndUpdate({
                _id: ObjectId(req.params.id)
            }, req.body)
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }

    res.status(200).json({
        user: usuarioAtualizado,
    })

}

exports.createUser = async (req, res, next) => {
    let usuarioCriado;
    let salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(req.body.password, salt)

    let usuario = {
        email: req.body.email,
        password: password,
        role: req.body.role
    }

    try {
        usuarioCriado = await Usuario
            .create(usuario)
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(201).json({
        message: "Usuario cadastrado com sucesso!",
        usuario: usuarioCriado
    });
}

exports.removeUsuario = async (req, res, next) => {
    let usuarioRemovido;
    try {
        usuarioRemovido = await Usuario.findByIdAndRemove({
            _id: ObjectId(req.params.id)
        })
    } catch(err) {
        res.status(422).send({ 
            messageError: err
        });
    }
    res.status(200).json({
        message: 'Usuario deletado com sucesso!',
        usuario: usuarioRemovido
    });
}