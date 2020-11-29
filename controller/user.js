const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    let { email, pwd } = req.body;
    if (!email || !pwd) return res.json({ message: "Incomplete Request", status: 400 });
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "Email or Password Invalid", status: 404 });
    let isAuthentic = await bcrypt.compare(pwd, user.password);
    if (!isAuthentic) return res.json({ message: "Email or Password Invalid", status: 404 });
    let details = {
      name: user.name,
      email: user.email,
      level: user.level,
    };
    return res.json({ message: "Logged In Successfully", status: 200, details });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 500 });
  }
};

exports.register = async (req, res) => {
  try {
    let { name, email, pwd } = req.body;
    if (!name || !email || !pwd) return res.json({ message: "Incomplete Request", status: 400 });
    let isexist = await User.findOne({ email });
    if (isexist) return res.json({ message: "Bad Request", status: 400 });
    let password = await bcrypt.hash(pwd, 12);
    let user = new User({ name, email, password });
    await user.save();
    return res.json({ message: "Registration Successfull", status: 200, details: { name, email, level: 1 } });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 500 });
  }
};

exports.setLevel = async (req, res) => {
  try {
    let { email, level } = req.body;
    if (!email || !level) return res.json({ message: "Incomplete Request", status: 400 });
    await User.findOneAndUpdate({ email }, { level });
    return res.json({ message: "Update Complete", status: 200, details: { level } });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 500 });
  }
};
