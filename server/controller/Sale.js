const conn = require("../db/conn");

const addServiceData = (req, res) => {
  const {
    service,
    quantity,
    duration,
    amount,
    received,
    starting_date,
    ending_date,
    customer_id,
  } = req.body;
  const q =
    "INSERT INTO customer_sale(service, quantity, duration, amount,received, starting_date, ending_date, customer_id) VALUES (?, ?, ?, ?,?, ?, ?, ?)";
  const values = [
    service,
    quantity,
    duration,
    amount,
    received,
    starting_date,
    ending_date,
    customer_id,
  ];

  conn.query(q, values, (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Sale Cannot Added" });
      console.log("failed")
    } else {
      res.json({ msg: "Sale Added Successfully" });
      console.log("adde3d succefully")
    }
  });
};
const getcontactSalewithid = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM customer_sale WHERE customer_id = ${id}`;

  conn.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting contact sale data in server.js" + error);
    }
    return res.json(result);
  });
};

const getSaleViewDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM customer_sale WHERE id=?`;

  conn.query(sql, [id], (error, result) => {
    if (error) {
      console.log("Error Getting contact sale view data in server.js" + error);
    }
    return res.json(result);
  });
};
const editcontactsaleview = (req, res) => {
  let id = req.params.id;
  const {
    service,
    quantity,
    duration,
    amount,
    received,
    starting_date,
    ending_date
  } = req.body;
  let sql = `UPDATE customer_sale SET service=?, quantity=?, duration=?, amount=?, received=?, starting_date=?, ending_date=? WHERE id=?`;
  const data = [
    service,
    quantity,
    duration,
    amount,
    received,
    starting_date,
    ending_date,
    id,
  ];
  conn.query(sql, data, (error) => {
    if (error) {
      console.error("Error updating customer sale data:", error);
      return res.status(500).json({ error: "Error updating customer sale data" });
    }
    return res.sendStatus(200);
  });
};

const deleteSaleContactData = (req, res) => {
  const deleteid = req.params.id;
  const sql = `DELETE from customer_sale where id=${deleteid}`;
  conn.query(sql, (error) => {
    if (error) {
      console.error("Error deleting customer sale data:", error);
      return res.status(500).json({ error: "Error deleting customer sale data" });
    }
    return res.sendStatus(200);
  });
}
// const addDuplicateData = (req, res) => {
//   const id = req.params.id;
//   const {
//     service,
//     quantity,
//     duration,
//     amount,
//     received,
//     starting_date,
//     ending_date,
//     customer_id,
//   } = req.body;
//   const q =
//     "INSERT INTO customer_sale(service, quantity, duration, amount,received, starting_date, ending_date, customer_id) VALUES (?, ?, ?, ?,?, ?, ?, ?)";
//   const values = [
//     service,
//     quantity,
//     duration,
//     amount,
//     received,
//     starting_date,
//     ending_date,
//     customer_id,
//   ];

//   conn.query(q, values, (err, data) => {
//     if (err) {
//       res.status(500).json({ msg: "Sale Cannot Added" });
//     } else {
//       res.json({ msg: "Sale Added Successfully" });
//     }
//   });
// };

module.exports = { addServiceData, getcontactSalewithid, getSaleViewDataWithId, editcontactsaleview, deleteSaleContactData };
