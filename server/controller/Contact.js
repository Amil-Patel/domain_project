const conn = require("../db/conn");

const getContactData = (req, res) => {
  const sql = "SELECT * FROM contact_master";
  conn.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting contact data in server.js" + error);
    }
    return res.json(result);
  });
};
const getContactDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM contact_master WHERE id=${id}`;
  conn.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting contact data in server.js" + error);
    }
    return res.json(result);
  });
};
const getContactDataViewaWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM contact_master WHERE id=${id}`;

  conn.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting contact view data in server.js" + error);
    }
    return res.json(result);
  });
};
const addContactData = (req, res) => {
  const { cname, domain, mobile_no, email } = req.body;
  const values = [cname, domain, mobile_no, email];
  const q =
    "INSERT INTO `contact_master` (`cname`, `domain`, `mobile_no`, `email`) VALUES (?, ?, ?, ?)";

  conn.query(q, values, (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Contact Cannot Added" });
    } else {
      res.json(data);
    }
  });
};

const editContactData = (req, res) => {
  let id = req.params.id;
  const {
    cname,
    domain,
    mobile_no,
    email,
  } = req.body;
  let sql = `UPDATE contact_master SET cname=?, domain=?, mobile_no=?, email=? WHERE id=?`;
  const data = [
    cname,
    domain,
    mobile_no,
    email,
    id,
  ];
  conn.query(sql, data, (error) => {
    if (error) {
      console.error("Error updating contact data:", error);
      return res.status(500).json({ error: "Error updating contact data" });
    }
    return res.sendStatus(200);
  });
};

module.exports = {
  getContactData,
  addContactData,
  getContactDataWithId,
  getContactDataViewaWithId,
  editContactData,
};
