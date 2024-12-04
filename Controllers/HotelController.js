const Hotel = require("../Models/Hotel");

const getAllHotels = async (req, res) => {
  try {
    const { limit, ...filters } = req.query;
    const hotels = await Hotel.find({ ...filters }).limit(limit || 10);
    return res.status(200).json({ status: "success", data: hotels });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const hotel = await Hotel.findById(hotel_id);
    return res.status(200).json({ status: "success", data: hotel });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { getAllHotels, getHotel };
