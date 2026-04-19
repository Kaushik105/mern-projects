import { Router } from "express";
import { upload } from "../../helpers/cloudinary.js";
import {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
	handleImageUpload,
} from "../../controllers/admin/product.controller.js";

const router = Router();

router.post("/upload-image", upload.single("image"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProducts);
router.patch("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
