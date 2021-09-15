const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const hashPassword = user.password;
    const compareResult = bcrypt.compareSync(password, hashPassword);
    if (compareResult) {
      const { SECRET_KEY } = process.env;
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY);
      await User.findByIdAndUpdate(user._id, { token });
    if(!user.verify){
        throw new BadRequest("Email не подтвержден");
    }  
      return res.status(200).json({
        status: "OK",
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

  throw new Unauthorized("Email or password is wrong");
};

module.exports = login;