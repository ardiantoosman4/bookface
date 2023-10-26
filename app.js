const express = require("express");
const route = require("./routers/index");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
