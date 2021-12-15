const connectDB = require("../db/connect");

const dbConnection = async() => {
    const client = connectDB(process.env.MONGO_URI);
    const db = (await client).db("RoomBooking");
    return db;
};

// Getting the available rooms
const availableRoom = async(db) => {
    const roomAvailable = await db
        .collection("rooms")
        .find({ bookedStatus: false })
        .project({ roomId: 1 })
        .toArray();

    return roomAvailable.map((el) => el.roomId)[0];
    // console.log("Available rooms", roomAvailable);
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

const bookRoom = async(req, res) => {
    // Getting the DB Connection
    const db = await dbConnection();
    let data = [];

    const roomAvailable = await availableRoom(db);

    console.log(roomAvailable);
    req.body.roomId = roomAvailable;
    console.log(req.body);

    const result = await db
        .collection("rooms")
        .updateOne({ roomId: roomAvailable }, { $set: { bookedStatus: true } });

    if (result.acknowledged) {
        data = await db.collection("customers").insertOne(req.body);
        console.log(data);
    }
    console.log(data);
    res.status(200).json({ msg: "Room booked successfully", data });
};

module.exports = { getAllRooms, bookRoom, createRoom };