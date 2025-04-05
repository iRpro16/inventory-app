const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter  = require("./routes/indexRouter");

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static(assetsPath));

// routers
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening to on PORT: ${PORT}`);
})