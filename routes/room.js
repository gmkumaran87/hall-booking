const express = require("express");
const { getAllRooms, bookRoom, createRoom } = require("../controllers/rooms");

const router = express.Router();

console.log("Inside Rooms Router");

router.route("/").get(getAllRooms);
router.route("/create-room").post(createRoom);
router.route("/book-room").post(bookRoom);

module.exports = router;