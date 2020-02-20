const path = require("path");
const dotenv = require("dotenv");

const root = path.join(__dirname, ".env");
dotenv.config({ path: root });

const IS_PRODUCTION = process.env.NODE_ENV === "production";
module.exports = {
    PORT: process.env.PORT || 5050,
    URL: IS_PRODUCTION ? process.env.PROD_URL : process.env.DEV_URL,
};