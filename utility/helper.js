const connectDB = require("../db/connect");

const dbConnection = async() => {
    const client = connectDB(process.env.MONGO_URI);
    const db = (await client).db("RoomBooking");
    return db;
};

const getDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const monthString = month.length < 2 ? "0" + month : month;
    const day = String(date.getDate());
    const dayString = day.length < 2 ? "0" + day : day;

    return `${year}-${monthString}-${dayString}`;
};

const getTime = (timeStamp) => {
    const time = new Date(timeStamp);
    const hours =
        String(time.getHours()).length < 2 ?
        "0" + String(time.getHours()) :
        String(time.getHours());

    const min = String(time.getMinutes());

    const minutes = min.length < 2 ? "0" + min : min;

    return hours + ":" + minutes;
};
module.exports = { dbConnection, getDate, getTime };