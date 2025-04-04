const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static(assetsPath));

// routers


const PORT = 3000;
app.listen(() => {
    console.log(`Listening to on PORT: ${PORT}`);
})