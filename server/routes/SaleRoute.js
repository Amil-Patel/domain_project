const express = require("express");
const router = express.Router();

const Sale = require("../controller/Sale");

router.route("/addservicedata").post(Sale.addServiceData);
// router.route("/addduplicatedata").post(Sale.addDuplicateData);
router.route("/getcontactsalewithid/:id").get(Sale.getcontactSalewithid);
router.route("/getcontactsaleViewDatawithid/:id").get(Sale.getSaleViewDataWithId);
router.route("/editcontactsaleviewdata/:id").put(Sale.editcontactsaleview);
router.route("/deletesalecontactdata/:id").delete(Sale.deleteSaleContactData);

module.exports = router;
