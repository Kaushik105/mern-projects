import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		cartId: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "Cart",
			required: true,
		},
		cartItem: [
			{
				type: mongoose.Types.Schema.ObjectId,
				ref: "Product",
			},
		],
		addressInfo: {
			type: mongoose.Types.Schema.ObjectId,
			ref: "Address",
		},
		paymentMethod: {
			type: String,
		},
		totalAmount: {
			type: Number,
		},
		orderDate: {
			type: Date,
		},
		orderUpdateDate: {
			type: Date,
		},
		paymentId: {
			type: String,
		},
		payerId: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
