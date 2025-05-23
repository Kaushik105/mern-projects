import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	pincode: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
});

export const Address = mongoose.model("Address", addressSchema);
