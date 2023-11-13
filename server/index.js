import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// currently storing assets locally, but will be moved to cloudinary

/* ROUTES */

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;

mongoose.connection.on("connecting", () => {
    console.log("Connecting to Database...");
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Database");
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from Database");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose
    .connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
