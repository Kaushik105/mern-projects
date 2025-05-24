import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Order } from "../../models/order.model.js";
import paypal from "../../helpers/paypal.js";
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

const createOrder = asyncHandler(async (req, res) => {
	const {
		userId,
		cartId,
		cartItems,
		addressInfo,
		paymentMethod,
		totalAmount,
		orderStatus,
		paymentStatus,
		orderDate,
		orderUpdateDate,
		paymentId,
		payerId,
	} = req.body;

	const createPaymentJson = {
		intent: "sale",
		payer: {
			payment_method: "paypal",
		},
		redirect_urls: {
			return_url: "http://localhost:5173/shop/paypal-return",
			cancel_url: "http://localhost:5173/shop/paypal-cancel",
		},
		transactions: [
			{
				item_list: {
					items: cartItems.map((item) => ({
						name: item.title,
						sku: item._id,
						price: item.price.toFixed(2),
						currency: "USD",
						quantity: item.quantity,
					})),
				},
				amount: {
					currency: "USD",
					total: totalAmount.toFixed(2),
				},
				description: "test payment description",
			},
		],
	};

	paypal.payment.create(createPaymentJson, async (error, payentInfo) => {
		if (error) {
			return res.json(new ApiError(500, "error while creating paypal payment"));
		} else {
			const newlyCreatedOrder = new Order({
				userId,
				cartId,
				cartItems,
				addressInfo,
				paymentMethod,
				totalAmount,
				orderStatus,
				paymentStatus,
				orderDate,
				orderUpdateDate,
				paymentId,
				payerId,
			});

			await newlyCreatedOrder.save();
			const approvalURL = payentInfo.links.find(
				(link) => link.rel === "approval_url"
			).href;

			

			return res
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ approvalURL, orderId: newlyCreatedOrder._id},
						"order created successfully"
					)
				);
		}
	});
});
const capturePayment = asyncHandler(async (req, res) => {
	const { paymentId, payerId, orderId } = req.body;
	let order = await Order.findById(orderId);

	if (!order) {
		return res.json(new ApiError(500, "order not found"));
	}

	order.paymentStatus = "paid";
	order.paymentId = paymentId;
	order.payerId = payerId;
	order.orderStatus = "In Process";

	for (const item of order.cartItems) {
		let product = await Product.findById(item.productId);

		if (!product) {
			return res.json(new ApiError(500, "product not found"));
		}

		product.totalStock -= item.quantity;

		await product.save();
	}

	const getCartId = order.cartId;
	await Cart.findByIdAndDelete(getCartId);

	await order.save();
	console.log(order);
	

	return res.status(200).json(new ApiResponse(200, order, "order confirmed"));
});

const getAllOrdersByUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const orders = await Order.find({ userId });

	if (!orders.length) {
		return res.json(new ApiError(500, "no orders found"));
	}

	return res.json(new ApiResponse(200, orders, "orders fetched"));
});
const getOrderDetails = asyncHandler(async (req, res) => {
	const { orderId } = req.params;

	const order = await Order.findById(orderId);

	if (!order) {
		return res.json(new ApiError(500, "no orders found"));
	}

	return res.json(new ApiResponse(200, order, "order details fetched"));
});

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
