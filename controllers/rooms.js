const getAllRooms = (req, res) => {
    console.log("Inside Rooms controller");
    console.log(req.url);
    res.send("All rooms");
};

const bookRoom = (req, res) => {
    res.send("Room booking page..");
};

module.exports = { getAllRooms, bookRoom };