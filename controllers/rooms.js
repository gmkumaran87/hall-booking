// const dbClient = require("../index");

const connectDB = require("../db/connect");

const dbConnection = async() => {
    const client = connectDB(process.env.MONGO_URI);
    const db = (await client).db("RoomBooking");
    return db;
};

const getAllRooms = (req, res) => {
    console.log("Inside Rooms controller");
    console.log(req.url);
    res.send("All rooms");
};

const createRoom = async(req, res) => {
    console.log("Room creation", req.body);

    const db = await dbConnection();

    const roomExists = await db
        .collection("rooms")
        .findOne({ roomId: req.body.roomId });

    if (!roomExists) {
        const row = await db.collection("rooms").insertOne(req.body);
        res.status(200).json({ msg: "Room Created", id: row });
    } else {
        res.status(201).send("Room already created with this Id...");
    }
};

const bookRoom = (req, res) => {
    res.send("Room booking page..");
};

module.exports = { getAllRooms, bookRoom, createRoom };