import { model, Schema } from "mongoose";

const placeSchema = new Schema(
    {
        model: {
            type: String,
            required: true,
        },
        modelScale: {
            type: Number,
            required: true,
        },
        modelRotation: {
            type: {
                x: Number,
                y: Number,
                z: Number,
            },
            required: true,
        },
        modelCoordinates: {
            type: {
                lat: Number,
                lng: Number,
                altitude: {
                    type: Number,
                    default: 0,
                },
            },
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: String,
        imageUrl: String,
    },
    { timestamps: true }
);
export const Places = model("Places", placeSchema);
