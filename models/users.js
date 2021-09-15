const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailReg,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: ""
    }
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailReg).required(),
    avatarURL: Joi.string()
})

const User = model("user", userSchema);

module.exports = {
    User,
    joiSchema
}