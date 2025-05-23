import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		productId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		rating: {
			type: Number, 
			min: 1,
			max: 5,
		},
		reviewMessage: {
			type: String,
		},
		reviewValue: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
