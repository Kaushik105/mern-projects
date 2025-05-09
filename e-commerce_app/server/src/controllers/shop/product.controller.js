import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getFilteredProducts = asyncHandler(async (req, res) => {
	const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

	let filters = {};

	if (category.length) {
		filters.category = { $in: category.split(",") };
	}

	if (brand.length) {
		filters.brand = { $in: brand.split(",") };
	}

	let sort = {};

	switch (sortBy) {
		case "price-lowtohigh":
			sort.price = 1;

			break;
		case "price-hightolow":
			sort.price = -1;

			break;
		case "title-atoz":
			sort.price = 1;

			break;
		case "title-ztoa":
			sort.price = -1;

			break;

		default:
			sort.price = 1;
			break;
	}

	const products = await Product.find(filters).sort(sort);

	if (!(products && products.length !== 0)) {
		return res.json(new ApiError(500, "Product fetching failed"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductDetails = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await Product.findById(id);

	if (!product) {
		return res.json(new ApiError(500, "product details not found"));
	}

	return res.json(new ApiResponse(200, product, "product details fetched"));
});

export { getFilteredProducts, getProductDetails };
