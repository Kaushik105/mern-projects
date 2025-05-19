import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Order } from "../../models/order.model.js";
import paypal from "../../helpers/paypal.js";
import { Cart } from "../../models/cart.model.js";

const getAllOrdersForAdmin = asyncHandler(async (req, res) => {
	const orders = await Order.find();

	if (!orders.length) {
		return res.json(new ApiError(500, "no orders found"));
	}

	return res.json(new ApiResponse(200, orders, "orders fetched"));
});

const getOrderDetailsForAdmin = asyncHandler(async (req, res) => {
	const { orderId } = req.params;

	const order = await Order.findById(orderId);

	if (!order) {
		return res.json(new ApiError(500, "no orders found"));
	}

	return res.json(new ApiResponse(200, order, "order details fetched"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;
	const { orderId } = req.params;

	if (!(status && orderId)) {
		return res.json(new ApiError(400, "can't get parameters"));
	}

	let updatedOrder = await Order.findByIdAndUpdate(
		orderId,
		{
			orderStatus: status,
		},
		{ new: true }
	);

	if (!updatedOrder) {
		return res.json(new ApiError(500, "order updation failed"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedOrder, "order updated successfully"));
});

export { getOrderDetailsForAdmin, getAllOrdersForAdmin, updateOrderStatus };
