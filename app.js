const express = require("express");
const { PORT } = require("./config");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello")
});

app.listen(PORT, () => {
    console.log("Server up!")
});