const usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.verificaToken = (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Por favor, insira o token.");
    else {
        jwt.verify(token, "$en@c", (err, user) => {
            if (err) {
                res.status(401).send(err);
            }
            else {
                res.status(200).json({
                    id: user.id,
                    iat: user.iat,
                    exp: user.exp
                })
            }
        });
    }
}

exports.autentica = async (req, res, next) => {

    let userFound;

    try {
        userFound = await User.findOne({ email: req.body.email })
        if (userFound !== null) {
            if (bcrypt.compareSync(req.body.password, userFound.password)) {
                const token = jwt.sign(
                    {id: userFound.id}, '$en@c', {expiresIn: '1h'}
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