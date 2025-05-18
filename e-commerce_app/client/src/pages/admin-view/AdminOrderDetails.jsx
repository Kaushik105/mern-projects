import { Label } from "@/components/ui/label";
import { DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/Form";
import { DialogTitle } from "@radix-ui/react-dialog";

const orderDetailsFormControls =   [{
  label: "Status",
  name: "status",
  componentType: "select",
  options: [
    { id: "pending", label: "Pending" },
    { id: "inProcess", label: "In Process" },
    { id: "delivered", label: "Delivered" },
    { id: "rejected", label: "Rejected" },
  ],
}]

function AdminOrderDetails() {
  const [formData, setformData] = useState("pending")

  function handleOrderDeatilSubmit(e){
    e.preventDefault()
    console.log("submitted");
    
  }


  return (
    <div>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="hidden">Order Details</DialogTitle>
        <div className="flex flex-col gap-1.5 mt-5">
          <span className="flex justify-between">
            <Label>Order ID</Label>
            <p>1234658</p>
          </span>
          <span className="flex justify-between">
            <Label>Order Date</Label>
            <p>25/5/26</p>
          </span>
          <span className="flex justify-between">
            <Label>Order Price</Label>
            <p>$ 659</p>
          </span>
          <span className="flex justify-between">
            <Label>Order Status</Label>
            <p>In Progress</p>
          </span>
        </div>
        <Separator />
        <div className="grid gap-1.5">
          <Label>Order Details</Label>
          <span className="flex justify-between">
            <p>Product One</p>
            <p>$ 659</p>
          </span>
        </div>
        <Separator />
        <div className="grid gap-2">
          <Label>Shipping Info</Label>
          <span className="flex flex-col gap-1">
            <p>John Doe</p>
            <p>Address</p>
            <p>City</p>
            <p>Pincode</p>
            <p>Phone</p>
            <p>Notes</p>
          </span>
        </div>
        <CommonForm
          formControls={orderDetailsFormControls}
          formData={formData}
          setFormData={setformData}
          onSubmit={handleOrderDeatilSubmit}
          buttonText={"Update"}
          isBtnDisabled={false}
        />
      </DialogContent>
    </div>
  );
}

export default AdminOrderDetails;
