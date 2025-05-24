import {Feature} from "../../models/feature.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const addFeatureImage =asyncHandler( async (req, res) => {
		const { image } = req.body;


		const featureImages = new Feature({
			image,
		});

		await featureImages.save();

		res.status(201).json({
			success: true,
			data: featureImages,
		});
});

const getFeatureImages =asyncHandler( async (req, res) => {
		const images = await Feature.find({});

		res.status(200).json({
			success: true,
			data: images,
		});
	}
);

export { addFeatureImage, getFeatureImages };
