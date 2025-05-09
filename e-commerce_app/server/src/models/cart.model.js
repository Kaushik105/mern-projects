import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				productId: {
					type: mongoose.Types.Schema.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
			},
		],
	},
	{ timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
