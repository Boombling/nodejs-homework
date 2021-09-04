const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { User } = require("../../models");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const hashPassword = user.password;
        const compareReult = bcrypt.compareSync(password, hashPassword);

        if (compareReult) {
            const { SECET_KEY } = process.env;
            const payload = {
                id: user._id,
            }
            const token = jwt.sign(payload, SECET_KEY);
            await User.findByIdAndUpdate(user._id, { token });

            return res.status(200).json({
                status: "Success",
                code: 200,
                ResponseBody: {
                    token: token,
                    user: {
                        email: email,
                        subscription: "starter",
                    },
                },
            });
        }
    }

    throw new Unauthorized("Email or password is wrong")
}
module.exports = login;