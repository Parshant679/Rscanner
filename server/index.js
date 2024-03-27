const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "../server/.env" });
const pdfRoutes = require("./Routes/pdfRoutes");
const emailRoutes = require("./Routes/emailRoutes");
const cvRoutes = require("./Routes/cvRoutes");
const app = express();
app.use(express.json());

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
);
app.use(cors());
app.use("/api", pdfRoutes);
app.use("/api", emailRoutes);
app.use("/api", cvRoutes);

app.listen(process.env.PORT, () => {
  console.log("SERVER STARTED");
});
