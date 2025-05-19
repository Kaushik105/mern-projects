import React from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="hidden">Order Details</DialogTitle>
      <div className="flex flex-col gap-1.5 mt-5">
        <span className="flex justify-between">
          <Label>Order ID</Label>
          <p>{orderDetails?._id}</p>
        </span>
        <span className="flex justify-between">
          <Label>Order Date</Label>
          <p>{orderDetails?.orderDate.split("T")[0]}</p>
        </span>
        <span className="flex justify-between">
          <Label>Amount</Label>
          <p>{orderDetails?.totalAmount}</p>
        </span>
        <span className="flex justify-between">
          <Label>Payment method</Label>
          <p>{orderDetails?.paymentMethod}</p>
        </span>
        <span className="flex justify-between">
          <Label>Payment Status</Label>
          <p>{orderDetails?.paymentStatus}</p>
        </span>
        <span className="flex justify-between">
          <Label>Order Status</Label>
          <p>{orderDetails?.orderStatus}</p>
        </span>
      </div>
      <Separator />
      <div className="grid gap-1.5">
        <Label>Order Details</Label>
        {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
          ? orderDetails?.cartItems.map((item) => (
              <span className="flex justify-between">
                <p>{item.title}</p>
                <p>$ {item.price}</p>
              </span>
            ))
          : null}
      </div>
      <Separator />
      <div className="grid gap-2">
        <Label>Shipping Info</Label>
        <span className="flex flex-col gap-1">
          <p>{user.username}</p>
          <p>Address: {orderDetails?.addressInfo?.address}</p>
          <p>City: {orderDetails?.addressInfo?.city}</p>
          <p>Pincode: {orderDetails?.addressInfo?.pincode}</p>
          <p>Phone: {orderDetails?.addressInfo?.phone}</p>
          <p>Notes: {orderDetails?.addressInfo?.notes}</p>
        </span>
      </div>
    </DialogContent>
  );
}
export default ShoppingOrderDetailsView;
