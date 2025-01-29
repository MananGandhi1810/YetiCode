import express from "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import authRouter from "./routes/auth.js";
import morgan from "morgan";
import repositoryRouter from "./routes/repository.js"

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
// app.use("/webhook",webhookRoute)

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
app.post("/webhook", (req, res) => {
  const payload = req.body;

  // Verify webhook signature
  const signature = req.headers["x-hub-signature-256"];
  if (!verifySignature(payload, signature)) {
    return res.status(403).send("Invalid signature");
  }

  // Process push event
  if (payload.action === "push") {
    console.log(`Push detected in repo: ${payload.repository.full_name}`);
    triggerBuild(payload); // Custom function to trigger build
  }

  res.status(200).send("Webhook processed");
});

const verifySignature = (payload, signature) => {
  const generatedSignature = `sha256=${crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest("hex")}`;
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(generatedSignature)
  );
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
export default app;
