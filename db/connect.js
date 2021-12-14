const { MongoClient } = require("mongodb");

const connectDB = async(url) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("DB Connected...!");
        return client;
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;