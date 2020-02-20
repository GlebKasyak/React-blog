const express = require("express");
const cookieParser = require("cookie-parser");

const { PORT } = require("./config");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user/", require("./routes/user.router"));

app.listen(PORT, () => {
    console.log(`Server up at ${ PORT }`)
});