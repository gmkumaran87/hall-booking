const express = require("express");
const getAllCustomers = require("../controllers/customer");

const router = express.Router();

router.route("/").get(getAllCustomers);

module.exports = router;