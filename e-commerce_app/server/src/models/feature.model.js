import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    image:{
        type: String
    }
})

export const Feature = mongoose.model("Feature", featureSchema)