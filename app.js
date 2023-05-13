// const express =require('express');
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import csurf from "csurf";
import mongoose from "mongoose";

//const articles = require("./routes/article.routes");
const routeFiles = ["admin", "auth", "feature", "hotel","booking"];

require('dotenv').config()
//express appp
const app = express();
const csrfProtect = csurf({ cookie: true });

// app setup

app.use(morgan("dev")); // dev on;y dev mode
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
// app.use(csrfProtect)

// app.use("/api/admin",adminroute)

// this is onl;y
app.use((req, res, next) => {
  console.log("this is my middle war");
  next();
});

const getCSRF = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

app.get("/api-get-csrf-token", getCSRF);

Promise.all(routeFiles.map((routeFile) => import(`./routes/${routeFile}.js`)))
  .then((routes) => {
    // Use routes
    routes.forEach((route, index) => {
      app.use(`/api/${routeFiles[index]}`, route.default);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// readdirSync("./routes").map((file)=>{
//   console.log(file)
//   return app.use("/api",require(`./routes/${file}`))
// })

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database error", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log("your server is runngin in ", PORT);
