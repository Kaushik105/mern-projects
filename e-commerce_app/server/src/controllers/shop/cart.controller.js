import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

//create a cart
const addToCart = asyncHandler(async (req, res) => {
	const { userId, productId, quantity = 1 } = req.body;

	if (!userId || !productId || quantity <= 0) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const product = await Product.findById(productId);

	if (!product) {
		return res.json(new ApiError(500, "product not found"));
	}

	let cart = await Cart.findOne({ userId });

	if (!cart) {
		cart = new Cart({ userId, items: [] });
		cart.items.push({ productId, quantity });
	} else {
		const findIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId
		);

		if (findIndex === -1) {
			cart.items.push({ productId, quantity });
		} else {
			cart.items[findIndex].quantity += quantity;
		}
	}
	await cart.save();

	cart = await Cart.findOne({ userId }).populate({
		path: "items.productId",
		select: "image title price salesPrice",
	});

	const populatedCartItems = cart.items.map((item) => ({
		productId: item.productId._id,
		image: item.productId.image,
		price: item.productId.price,
		title: item.productId.title,
		salesPrice: item.productId.salesPrice,
		quantity: item.quantity,
	}));

	return res.json(
		new ApiResponse(
			200,
			{ ...cart._doc, items: populatedCartItems },
			"Added to cart"
		)
	);
});

//fetch cart

const fetchCartItems = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const cart = await Cart.findOne({ userId }).populate({
		path: "items.productId",
		select: "image title price salesPrice",
	});

	if (!cart) {
		return res.json(new ApiError(500, "Cart not found"));
	}

	const validItems = cart.items.filter((productItem) => productItem.productId);

	if (validItems.length < cart.items.length) {
		cart.items = validItems;
		await cart.save();
	}

	const populatedCartItems = validItems.map((item) => ({
		productId: item.productId._id,
		image: item.productId.image,
		price: item.productId.price,
		title: item.productId.title,
		salesPrice: item.productId.salesPrice,
		quantity: item.quantity,
	}));

	return res.json(
		new ApiResponse(
			200,
			{ ...cart._doc, items: populatedCartItems },
			"cart fetched successfully"
		)
	);
});

//update cart

const updateCartItemQty = asyncHandler(async (req, res) => {
	const { userId, productId, quantity } = req.body;

	if (!userId || !productId || !quantity) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const cart = await Cart.findOne({ userId });

	if (!cart) {
		return res.json(new ApiError(500, "cart not found"));
	}

	const findIndex = cart.items.findIndex(
		(item) => item.productId.toString() === productId
	);

	if (findIndex === -1) {
		return res.json(new ApiError(500, "cart item not found"));
	}
	cart.items[findIndex].quantity += quantity;
	await cart.save();

	await cart.populate({
		path: "items.productId",
		select: "image title price salesPrice",
	});

	const populatedCartItems = cart.items.map((item) => ({
		productId: item.productId ? item.productId._id : null,
		image: item.productId ? item.productId.image : null,
		title: item.productId ? item.productId.title : null,
		price: item.productId ? item.productId.price : null,
		salesPrice: item.productId ? item.productId.salesPrice : null,
		quantity: item.productId ? item.quantity : null,
	}));

	return res.json(
		new ApiResponse(
			200,
			{ ...cart._doc, items: populatedCartItems },
			"cart updated successfully"
		)
	);
});

//delete cart
const deleteCartItem = asyncHandler(async (req, res) => {
	const { userId, productId } = req.params;

	if (!userId || !productId) {
		return res.json(new ApiError(400, "invalid parameters"));
	}

	const cart = await Cart.findOne({ userId });

	if (!cart) {
		return res.json(new ApiError(500, "cart not found"));
	}

	cart.items = cart.items.filter(
		(item) => item.productId._id.toString() !== productId
	);
	await cart.save();

	await cart.populate({
		path: "items.productId",
		select: "image title price salesPrice",
	});

	const populatedCartItems = cart.items.map((item) => ({
		productId: item.productId ? item.productId._id : null,
		image: item.productId ? item.productId.image : null,
		title: item.productId ? item.productId.title : null,
		price: item.productId ? item.productId.price : null,
		salesPrice: item.productId ? item.productId.salesPrice : null,
		quantity: item.productId ? item.quantity : null,
	}));

	return res.json(
		new ApiResponse(200, { ...cart._doc, items: populatedCartItems })
	);
});

export { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem };
