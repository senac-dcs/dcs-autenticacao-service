const mongoose = require('mongoose');

const Usuario = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        enum: ['professor','aluno'],
        required: true
    }
});

module.exports = mongoose.model('Usuario', Usuario);