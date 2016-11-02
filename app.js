const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const requestHandler = require("./request-handler");
const app = express();
const port = process.env.PORT || 8001;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", router);

router.route("/").get((req, res) => res.status(200).send()).post(requestHandler);
app.listen(port, () => { console.log("Listen port " + port); });
