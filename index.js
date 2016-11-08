const express = require("express");
const morgan = require("morgan");
const serveStatic = require("serve-static");

const app = express();

app.use(morgan("dev"));
app.use(serveStatic("public"));

app.listen(process.env.PORT || "8080");
