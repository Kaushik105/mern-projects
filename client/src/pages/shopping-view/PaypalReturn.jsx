import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const PayerID = params.get("PayerID");
  const { orderId } = useSelector((state) => state.shopOrder);
  const navigate = useNavigate()

  useEffect(() => {
    if (paymentId && PayerID) {
      const getCurrentOrderId = JSON.parse(
        sessionStorage.getItem("currentOrderId")
      );

      dispatch(
        capturePayment({
          paymentId,
          payerId: PayerID,
          orderId: getCurrentOrderId,
        })
      ).then((data) => {
        if (data.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
         navigate("/shop/payment-success");
        }
      });
    }
  }, [PayerID, paymentId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment.....please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}
export default PaypalReturnPage;
