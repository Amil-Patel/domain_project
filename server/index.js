const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const contactRoute = require("./routes/ContactRoute");
const SaleRoute = require("./routes/SaleRoute");
const ServiceRoute = require("./routes/ServiceRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Contact App");
});
app.use("/", contactRoute);
app.use("/", SaleRoute);
app.use("/", ServiceRoute);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

//you can change port number form config.js in server folder
