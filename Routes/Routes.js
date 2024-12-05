const express = require("express");
const { getUser, saveUser } = require("../Controllers/UserController");
const { getAllHotels, getHotel } = require("../Controllers/HotelController");
const {
  LoginController,
  RegisterController,
} = require("../Controllers/AuthContoller");
const { verifyToken, verifyUserWithAPIKey } = require("../utils/verifyToken");

const router = express.Router();
//getUser
router.get("/users/getUser", verifyToken, getUser);
router.put("/users/saveUser", verifyToken, saveUser);
//GetHotels
router.get("/hotels/getAllHotels", verifyUserWithAPIKey, getAllHotels);
router.get("/getAllHotel/:hotel_id", verifyUserWithAPIKey, getHotel);

//Auth
router.post("/auth/login", LoginController);
router.post("/auth/register", RegisterController);

module.exports = router;
