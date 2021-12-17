const { dbConnection } = require("../utility/helper");

// Getting the available rooms
const availableRoom = async(db, date, checkIn) => {
    // const totalRooms = await db.collection("rooms").find().toArray();

    // console.log("Total Rooms", totalRooms);
    let roomAvailable = await db
        .collection("rooms")
        .find({
            $or: [{
                    bookedStatus: false,
                },
                {
                    checkInDate: {
                        $ne: 1640131200000,
                    },
                },
            ],
        })
        .project({ roomId: 1 })
        .toArray();

    if (roomAvailable.length === 0) {
        // const notBooked = await db.collection('rooms').find({checkInDate: date}).toArray();

        roomAvailable = await db
            .collection("rooms")
            .find({
                $and: [{
                        checkInDate: date,
                    },
                    {
                        checkOutTime: {
                            $lt: checkIn,
                        },
                    },
                ],
            })
            .project({ roomId: 1 })
            .toArray();
    }

    return roomAvailable.map((el) => el.roomId)[0];
};
const getAllRooms = async(req, res) => {
    const db = await dbConnection();
    const rooms = await db.collection("rooms").find({}).toArray();

    res.status(200).json({ msg: "Rooms details", rooms });
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
    const { customerName, bookingDate, checkInTime, checkOutTime } = req.body;

    const date = new Date(bookingDate).getTime();
    const checkIn = new Date(bookingDate).setHours(checkInTime);

    const checkOut = new Date(bookingDate).setHours(checkOutTime);

    console.log(date, checkIn, checkOut);

    // Getting the DB Connection
    const db = await dbConnection();
    let data = [];

    const roomAvailable = await availableRoom(db, date, checkIn);

    if (roomAvailable) {
        const custObj = {
            customerName,
            bookingDate: date,
            checkInTime: checkIn,
            checkOutTime: checkOut,
            roomId: roomAvailable,
        };

        console.log("Customer Object", custObj);

        // Updating Room Collections with checkin Time
        const result = await db.collection("rooms").updateOne({ roomId: roomAvailable }, {
            $set: {
                bookedStatus: true,
                checkInDate: date,
                checkOutTime: checkOut,
            },
        });

        if (result.acknowledged) {
            data = await db.collection("customers").insertOne(custObj);
            console.log(data);
        }
    }

    res.status(200).json({ msg: "Room booked successfully", data });
};

module.exports = { getAllRooms, bookRoom, createRoom, dbConnection };