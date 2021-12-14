const express = require("express");
const { getAllRooms, bookRoom } = require("../controllers/rooms");

const router = express.Router();

console.log("Inside Rooms Router");

router.route("/").get(getAllRooms);

module.exports = router;