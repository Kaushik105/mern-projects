import ShoppingOrderDetailsView from "@/components/shopping-view/ShoppingOrderDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/orderSlice";

function ShoppingOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();

  function handleGetOrderDetails(orderId) {
    dispatch(getOrderDetails({ orderId })).then((data) => {
      if (data?.payload?.success) {
        setOpenDetailsDialog(true);
      }
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser({ userId: user._id }));
  }, [dispatch]);

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
                      <TableCell>{orderItem.orderStatus}</TableCell>
                      <TableCell>$ {orderItem.totalAmount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setOpenDetailsDialog(true);
                            handleGetOrderDetails(orderItem._id);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={openDetailsDialog}
        onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetails());
        }}
      >
        <ShoppingOrderDetailsView orderDetails={orderDetails && orderDetails} />
      </Dialog>
    </div>
  );
}

export default ShoppingOrdersView;
