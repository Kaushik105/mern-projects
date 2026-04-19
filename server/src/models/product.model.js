import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		salesPrice: {
			type: Number,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		totalStock: {
			type: Number,
		},
		averageReview: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);