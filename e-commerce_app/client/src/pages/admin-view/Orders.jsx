import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/orderSlice";
import { Badge } from "@/components/ui/badge";

function AdminOrdersView() {
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch, openOrderDetailsDialog]);

  function handleAdminOrderDialog(orderId) {
    dispatch(getOrderDetailsForAdmin({ orderId })).then((data) => {
      if (data?.payload?.success) {
        setOpenOrderDetailsDialog(true);
      }
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem._id}>
                      <TableCell>{orderItem._id}</TableCell>
                      <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                      <TableCell><Badge className={`${orderItem.orderStatus == "In Process" ? "bg-yellow-400 text-black" : orderItem.orderStatus == "Pending" ? "bg-blue-400 text-white" : orderItem.orderStatus == "Delivered" ? "bg-green-400 text-indigo-800" : "bg-black"} {} px-2 py-1 rounded-full`}>{orderItem.orderStatus}</Badge></TableCell>
                      <TableCell>$ {orderItem.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openOrderDetailsDialog}
                          onOpenChange={() => {
                            setOpenOrderDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleAdminOrderDialog(orderItem._id);
                            }}
                          >
                            view details
                          </Button>
                          <AdminOrderDetails
                            key={orderDetails?._id}
                            orderItem={orderDetails && orderDetails}
                          />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;
