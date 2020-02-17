const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    secondName: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
},{
    timestamps: true
});

module.exports = model("User", UserSchema);