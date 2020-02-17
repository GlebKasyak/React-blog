const config = require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5050,
    URL: process.env.URL || "mongodb+srv://Kasyak:12341234@react-mern-24iag.azure.mongodb.net/mern_boiler-stack-plate?retryWrites=true&w=majority"
}