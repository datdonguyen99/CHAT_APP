const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userName = await User.findOne({ username });
    if (userName) {
      return res.json({ msg: "Username already used!", status: false });
    }
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.json({ msg: "Email already used!", status: false });
    }
    const hashPassword = await bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (ex) {
    next(ex);
  }
};
