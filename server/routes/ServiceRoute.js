const express = require("express");
const router = express.Router();

const Service = require("../controller/Service");

router.route("/addservice").post(Service.addService);
router.route("/getservicesdata").get(Service.getServiceData);

module.exports = router;