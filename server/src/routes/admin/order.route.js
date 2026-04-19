import { Router } from "express";
import {
	getAllOrdersForAdmin,
	getOrderDetailsForAdmin,
    updateOrderStatus,
} from "../../controllers/admin/order.controller.js";

const router = Router();

router.get("/get", getAllOrdersForAdmin);
router.get("/details/:orderId", getOrderDetailsForAdmin);
router.put("/update/:orderId", updateOrderStatus);

export default router;
