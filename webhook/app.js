import express from "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import authRouter from "./routes/auth.js";
import jwt from "jsonwebtoken";

var app = express();

app.use(
  CORS({
    origin: true,
  })
);
const payload = { userId: 123, role: "admin" };
const secretKey = "naitiklikesmilk"; // Replace with generated secret

const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
console.log(token)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: "This route could not be found",
    data: null,
  });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    success: false,
    message: "An error occurred",
    data: null,
  });
});

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
export default app;
