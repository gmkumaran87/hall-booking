const { dbConnection, getDate, getTime } = require("../utility/helper");

const getAllCustomers = async(req, res) => {
    const db = await dbConnection();
    const customers = await db.collection("customers").find({}).toArray();

    const updatedCust = customers.map((el) => {
        const newDate = getDate(el.bookingDate);
        const checkInTime = getTime(el.checkInTime);
        const checkOutTime = getTime(el.checkOutTime);

        return {...el, bookingDate: newDate, checkOutTime, checkInTime };
    });
    console.log(updatedCust);

    res.status(200).json({
        msg: "Customer details",
        customers: updatedCust,
    });
};

module.exports = getAllCustomers;