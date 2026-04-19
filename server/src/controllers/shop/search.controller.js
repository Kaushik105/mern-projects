import {Product} from "../../models/product.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const searchProducts = asyncHandler(async (req, res) => {
	const { keyword } = req.params;
	if (!keyword || typeof keyword !== "string") {
		return res.status(400).json({
			succes: false,
			message: "Keyword is required and must be in string format",
		});
	}

	const regEx = new RegExp(keyword, "i");

	const createSearchQuery = {
		$or: [
			{ title: regEx },
			{ description: regEx },
			{ category: regEx },
			{ brand: regEx },
		],
	};

	const searchResults = await Product.find(createSearchQuery);

	res.status(200).json(new ApiResponse(200, searchResults, "searched results"));
});

export {searchProducts}
