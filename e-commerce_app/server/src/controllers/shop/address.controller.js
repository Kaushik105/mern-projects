import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/User.model.js";
import { Address } from "../../models/address.model.js";

const addAddress = asyncHandler(async (req, res) => {
	const { userId, address, city, pincode, phone, notes } = req.body;

	if (!(userId || address || city || pincode || phone || notes)) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const user = await User.findById(userId);

	if (!user) {
		return res.json(new ApiError(500, "user not found"));
	}

	const numberOfAddresses = await Address.find({ user: userId });

	if (numberOfAddresses && numberOfAddresses.length >= 3) {
		return res.json(new ApiError(400, "Maximum address count reached"));
	}

	const newAddress = new Address({
		user: userId,
		address,
		city,
		pincode,
		phone,
		notes,
	});

	await newAddress.save();

	if (!newAddress) {
		return res.json(new ApiError(500, "address creation failed"));
	}

	return res.json(
		new ApiResponse(200, newAddress, "Address created successfully")
	);
});
const fetchAddress = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.json(new ApiError(400, "invalid userId"));
	}

	const address = await Address.find({ user: userId });

	if (!address) {
		return res.json(new ApiError(500, "can't fetch addresses"));
	}

	return res.json(
		new ApiResponse(200, address, "addresses fetched successfully")
	);
});
const editAddress = asyncHandler(async (req, res) => {
	const { address, city, pincode, phone, notes } = req.body;
	const { userId, addressId } = req.params;

	if (!(userId || address || city || pincode || phone || notes || addressId)) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const newAddress = await Address.findOneAndUpdate(
		{ user: userId, _id: addressId },
		{
			address,
			city,
			pincode,
			phone,
			notes,
		},
		{ new: true }
	);

	if (!newAddress) {
		return res.json(new ApiError(500, "address updation failed"));
	}

	return res.json(
		new ApiResponse(200, newAddress, "address updated successfully")
	);
});
const deleteAddress = asyncHandler(async (req, res) => {
	const { userId, addressId } = req.params;
	if (!(userId || addressId)) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const deletedAddress = await Address.findOneAndDelete({
		user: userId,
		_id: addressId,
	});

	if (!deletedAddress) {
		return res.json(new ApiError(500, "address deletion failed"));
	}

	return res.json(
		new ApiResponse(200, deletedAddress, "address deleted successfully")
	);
});

export { addAddress, fetchAddress, editAddress, deleteAddress };
