const express = require("express");
const connectDB = require("./db/connect");

require("dotenv").config();

const app = express();
app.use(express.json());

// Routers Middleware
const roomsRouter = require("./routes/room");
const customerRouter = require("./routes/customer");

app.get("/", (req, res) => {
    res.send("Welcome to the Room booking App...");
});

// Routes
app.get("/api/v1/rooms", (req, res) => {
    res.send("Rooms available");
});
app.use("/api/v1/customer", customerRouter);

const port = process.env.PORT;

const start = async() => {
    try {
        const client = await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${port}...`)
        );
        // return client;
    } catch (error) {}
};

start();

// module.exports = db;