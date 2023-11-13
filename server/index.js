import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Places } from "./models.js";

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

const placeInformation = [
    {
        model: "/taj_mahal_3d_model/scene.gltf",
        modelScale: 0.19,
        modelRotation: { x: Math.PI / 2, y: -0.01, z: 0 },
        modelCoordinates: { lat: 27.175, lng: 78.042128 },
        name: "Taj Mahal",
        description:
            "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in the Indian city of Agra.",
        imageUrl: "/images/tajMahal.jpg", // Replace with the URL of an image for the place
    },
    {
        model: "/charminar_hyderabad/scene.gltf",
        modelScale: 12,
        modelRotation: { x: Math.PI / 2, y: Math.PI, z: 0 },
        modelCoordinates: { lat: 17.3619, lng: 78.47465 },
        name: "Charminar",
        description:
            "The Charminar is a monument and mosque located in Hyderabad, Telangana, India. The landmark has become a global icon of Hyderabad, listed among the most recognized structures of India.",
        imageUrl: "/images/charminar.jpg", // Replace with the URL of an image for the place
    },
    {
        model: "/eiffel_tower/scene.gltf",
        modelScale: 16,
        modelRotation: { x: Math.PI / 2, y: Math.PI / 4, z: 0 },
        modelCoordinates: { lat: 48.8576, lng: 2.2945, altitude: 40 },
        name: "Eiffel Tower",
        description:
            "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower",
        imageUrl: "/images/eiffel_tower.jpg", // Replace with the URL of an image for the place
    },
    {
        model: "/pyramid/scene.gltf",
        modelScale: 17,
        modelRotation: { x: Math.PI / 2, y: 0, z: 0 },
        modelCoordinates: { lat: 29.9759, lng: 31.1307 },
        name: "Pyramid of Khafre",
        description:
            "The Pyramid of Khafre, located on the Giza Plateau in Egypt, is the second-largest of the Giza Pyramids and is characterized by its distinctive limestone cap and the Great Sphinx guarding its base. Built during the Fourth Dynasty of the Old Kingdom, it is a testament to ancient Egyptian architectural prowess and served as a funerary monument for Pharaoh Khafre",
        imageUrl: "/images/pyramid.jpg", // Replace with the URL of an image for the place
    },
];
/* ROUTES */

app.get("/", async (req, res) => {
    const places = await Places.find();

    // uncomment to insert placeInformation into database
    // const places = await Places.insertMany(placeInformation);

    res.json({ places });
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
