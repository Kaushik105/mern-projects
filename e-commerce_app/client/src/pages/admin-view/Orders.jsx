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


function AdminOrdersView() {
  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] = useState(false);


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
              <TableRow>
                <TableCell>123455</TableCell>
                <TableCell>25/8/23</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>$ 399</TableCell>
                <TableCell>
                  <Dialog
                    open={openOrderDetailsDialog}
                    onOpenChange={setOpenOrderDetailsDialog}
                  >
                    <Button
                      onClick={() => {
                        setOpenOrderDetailsDialog(true);
                      }}
                    >
                      view details
                    </Button>
                    <AdminOrderDetails />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;
