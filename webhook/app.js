import express from "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import authRouter from "./routes/auth.js";
import morgan from "morgan";
import repositoryRouter from "./routes/repository.js";
import webhookRouter from "./routes/webhook.js";
import { configDotenv } from "dotenv";

configDotenv();
var app = express();

app.use(
    CORS({
        origin: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/repository", repositoryRouter);
app.use("/webhook", webhookRouter);

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
