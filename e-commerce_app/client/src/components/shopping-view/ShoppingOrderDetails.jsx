import React from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

function ShoppingOrderDetailsView() {
    return (
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
          </DialogContent>
      );
    }
export default ShoppingOrderDetailsView
