const conn = require("../db/conn");


const addService = (req, res) => {
    const { service_name } = req.body;
    const values = [service_name];
    const q =
        "INSERT INTO `service` (`service_name`) VALUES (?)";

    conn.query(q, values, (err, data) => {
        if (err) {
            res.status(500).json({ msg: "Service Cannot Added" });
        } else {
            res.json(data);
        }
    });
};

const getServiceData = (req, res) => {
    const sql = "SELECT * FROM service";
    conn.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting service data in server.js" + error);
        }
        return res.json(result);
    });
};






module.exports = { addService, getServiceData };
