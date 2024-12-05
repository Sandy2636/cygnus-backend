const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({ msg: "Wrong password or username!" });

    const { password, ...info } = user._doc;
    if (password !== req.body.password)
      return res.status(401).json({ msg: "Wrong password or username!" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .json({ status: "success", data: { ...info, accessToken } });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const RegisterController = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists)
      return res.status(400).json({ status: "error", msg: "Username taken." });
    const api_key = String(Math.floor(Math.random() * 9e15));
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      password: req.body.password,
      username: req.body.username,
      api_key,
    });

    await user.save();
    const { password, ...rest } = user._doc;
    return res.status(200).json({ status: "success", data: rest });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { LoginController, RegisterController };
