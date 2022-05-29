import express from "express";
import mongoose from "mongoose";
import router from "./src/router/router.js";
import fileUpload from "express-fileupload";
import { Consts } from "./src/consts.js";

const PORT = Consts.Backend_PORT;

const DB_URL =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
app.use(express.static("static"));

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log("server has been started - localhost:" + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
