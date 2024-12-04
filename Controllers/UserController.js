const User = require("../Models/User");

const getUser = async (req, res) => {
  try {
    if (!req.query.user_id)
      return res
        .status(400)
        .json({ status: "error", msg: "Please Provide User id" });

    const user = await User.findById(req.query.user_id);

    return res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getUser };
