import { Label } from "@/components/ui/label";
import { DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/Form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, updateOrderStatus } from "@/store/admin/orderSlice";
import { toast } from "sonner";

const orderDetailsFormControls = [
  {
    label: "Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "inProcess", label: "In Process" },
      { id: "delivered", label: "Delivered" },
      { id: "rejected", label: "Rejected" },
    ],
  },
];

const initialFormData ={
  status: ""
}

function AdminOrderDetails({orderItem}) {
  const [formData, setformData] = useState(initialFormData);
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  function handleOrderStatusUpdate(e) {
    e.preventDefault();
   dispatch(updateOrderStatus({orderId: orderItem._id, formData})).then((data) => {    
    if (data?.payload?.success) {
      toast.success("Order status updated")
      dispatch(getAllOrdersForAdmin)
    }
    })
    
    
  }

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="hidden">Order Details</DialogTitle>
      <div className="flex flex-col gap-1.5 mt-5">
        <span className="flex justify-between">
          <Label>Order ID</Label>
          <p>{orderItem?._id}</p>
        </span>
        <span className="flex justify-between">
          <Label>Order Date</Label>
          <p>{orderItem?.orderDate.split("T")[0]}</p>
        </span>
        <span className="flex justify-between">
          <Label>Amount</Label>
          <p>{orderItem?.totalAmount}</p>
        </span>
        <span className="flex justify-between">
          <Label>Payment method</Label>
          <p>{orderItem?.paymentMethod}</p>
        </span>
        <span className="flex justify-between">
          <Label>Payment Status</Label>
          <p>{orderItem?.paymentStatus}</p>
        </span>
        <span className="flex justify-between">
          <Label>Order Status</Label>
          <p>{orderItem?.orderStatus}</p>
        </span>
      </div>
      <Separator />
      <div className="grid gap-1.5">
        <Label>Order Details</Label>
        {orderItem?.cartItems && orderItem?.cartItems.length > 0
          ? orderItem?.cartItems.map((item) => (
              <span key={item.productId} className="flex justify-between">
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
          <p>Address: {orderItem?.addressInfo?.address}</p>
          <p>City: {orderItem?.addressInfo?.city}</p>
          <p>Pincode: {orderItem?.addressInfo?.pincode}</p>
          <p>Phone: {orderItem?.addressInfo?.phone}</p>
          <p>Notes: {orderItem?.addressInfo?.notes}</p>
        </span>
      </div>
      <CommonForm
        formControls={orderDetailsFormControls}
        formData={formData}
        setFormData={setformData}
        onSubmit={handleOrderStatusUpdate}
        buttonText={"Update Status"}
        isBtnDisabled={false}
      />
    </DialogContent>
  );
}

export default AdminOrderDetails;
