const { Conflict } = require("http-errors");

const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { sendMail } = require("../../utils");
const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public/avatars");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const defaultAvatar = gravatar.url(req.body.email, { s: "250" }, true);
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }
    const newUser = new User({
        email,
        avatarURL: `${defaultAvatar}`,
        // verificationToke: `${verificationToke}`
    })
    newUser.createVerifyToken();
    newUser.setPassword(password);
    const id = newUser._id.toString();
    const dirPath = path.join(avatarDir, id);
    await fs.mkdir(dirPath);
    
    await newUser.save();

    const { verificationToke } = newUser;
    const data = {
        to: email,
        subject: "registration",
        html:`<a href="http://localhost:3000/api/users/verify/${verificationToke}">Подтвердите регистрацию</a>`
    }
    
    await sendMail(data);

    res.status(201).json({
        status: "success",
        code: 201,
        message: "Success register",
        html:`<a href="http://localhost:3000/api/users/verify/${verificationToke}">Подтвердите регистрацию</a>`
    })
};

module.exports = signup;