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
        type: String,
        enum: ['professor','aluno', 'admin'],
        default: 'admin'
    }
});

module.exports = mongoose.model('Usuario', Usuario);