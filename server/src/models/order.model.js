import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		cartId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cart",
			required: true,
		},
		addressInfo: {
			addressId: String,
			address: String,
			city: String,
			pincode: String,
			phone: String,
			notes: String,
		},
		cartItems: [
			{
				productId: String,
				title: String,
				image: String,
				price: String,
				quantity: Number,
			},
		],
		paymentMethod: {
			type: String,
		},
		orderStatus: {
			type: String,
		},
		paymentStatus: {
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
