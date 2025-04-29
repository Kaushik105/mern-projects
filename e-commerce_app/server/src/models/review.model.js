import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "Product",
			required: true,
		},
		userId: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "User",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
