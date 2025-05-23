import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { Order } from "../../models/order.model.js";
import { Review } from "../../models/review.model.js";
import { Product } from "../../models/product.model.js";

const addProductReview = asyncHandler(async (req, res) => {
	const { productId, userId, username, reviewMessage, reviewValue } = req.body;

	const order = await Order.findOne({
		userId,
		"cartItems.productId": productId,
	});

	if (!order) {
		return res.json(new ApiError(500, "You have to buy the product to review it"));
	}
	const checkExistingReview = await Review.findOne({
		productId,
		userId,
	});
	if (checkExistingReview) {
		return res.json(
			new ApiError(400, "You have already reviewed this product")
		);
	}
	const newReview = new Review({
		productId,
		userId,
		username,
		reviewMessage,
		reviewValue,
	});

	await newReview.save();

	const reviews = await Review.find({ productId });
	const totalReviewsLength = reviews.length;
	const averageReview = reviews.reduce(
		(sum, item) => sum + item.reviewValue,
		0
	)/totalReviewsLength;
	

	await Product.findByIdAndUpdate(productId, { averageReview });

	return res
		.status(200)
		.json(new ApiResponse(200, newReview, "review submitted successfully"));
});

const getProductReviews = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	

	const reviews = await Review.find({ productId });
	return res.json(new ApiResponse(200, reviews, "review fetched successfully"));
});

export {addProductReview, getProductReviews}
