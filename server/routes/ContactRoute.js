const express = require("express");
const router = express.Router();

const Contact = require("../controller/Contact");

router.route("/getcontactdata").get(Contact.getContactData);
router.route("/getcontactdatViewawithid/:id").get(Contact.getContactDataViewaWithId);
router.route("/getcontactdatawithid/:id").get(Contact.getContactDataWithId);
router.route("/addcontactdata").post(Contact.addContactData);
router.route("/editcontactdata/:id").put(Contact.editContactData);

module.exports = router;
