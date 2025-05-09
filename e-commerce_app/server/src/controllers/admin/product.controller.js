import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const handleImageUpload = asyncHandler(async (req, res) => {
	const b64 = Buffer.from(req.file.buffer).toString("base64");
	const url = "data:" + req.file.mimetype + ";base64," + b64;
	const result = await imageUploadUtil(url);
	return res.json(new ApiResponse(200, result, "image uploaded"));
});

//add a product

const addProduct = asyncHandler(async (req, res) => {
	const {
		image,
		title,
		description,
		category,
		brand,
		price,
		salesPrice,
		totalStock,
		averageReview,
	} = req.body;

	if (
		!(
			image &&
			title &&
			description &&
			category &&
			brand &&
			price &&
			salesPrice != null &&
			totalStock &&
			averageReview != null
		)
	) {
		return res.json(new ApiError(500, "can't get parameters"));
	}

	const product = await Product.create({
		image,
		title,
		description,
		category,
		brand,
		price,
		salesPrice,
		totalStock,
		averageReview,
	});
	if (!product) {
		return res.json(new ApiError(500, "product addition failed"));
	}
	return res.json(new ApiResponse(200, product, "product added"));
});

//fetch products

const fetchAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	if (products.length === 0) {
		return res.json(new ApiError(500, "product fetching failed"));
	}
	return res.json(new ApiResponse(200, products, "All products fetched"));
});

//edit a product

const editProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		image,
		title,
		description,
		category,
		brand,
		price,
		salesPrice,
		totalStock,
		averageReview,
	} = req.body;

	if (!id) {
		return res.json(new ApiError(400, "can't get product id"));
	}

	const product = await Product.findById(id);
	if (!product) {
		return res.json(new ApiError(500, "can't get product "));
	}

	const updatedProduct = await Product.findByIdAndUpdate(id, {
		title: title || product.title,
		description: description || product.description,
		category: category || product.category,
		brand: brand || product.brand,
		price: price === "" ? 0 : price || product.price,
		salesPrice: salesPrice === "" ? 0 : salesPrice ,
		totalStock: totalStock || product.totalStock,
		image: image || product.image,
		averageReview: averageReview || product.averageReview,
	});

	if (!updatedProduct) {
		return res.json(new ApiError(500, "Product update failed"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, updatedProduct, "product update successful"));
});

//delete product

const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.json(new ApiError(400, "can't get product id"));
	}
	const product = await Product.findByIdAndDelete(id);
	if (!product) {
		return res.json(new ApiError(500, "can't delete product "));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, product, "product deletion successful"));
});

export {
	addProduct,
	fetchAllProducts,
	editProduct,
	deleteProduct,
	handleImageUpload,
};
