const express = require("express");

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
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/customer", customerRouter);
const port = process.env.PORT;

const start = async() => {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();