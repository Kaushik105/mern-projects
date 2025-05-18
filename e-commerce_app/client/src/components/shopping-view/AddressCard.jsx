import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function AddressCard({
  addressCardItem,
  handleAddressDelete,
  handleAddressEdit,
}) {
  return (
    <Card className={"p-2 gap-0 min-w-50 min-h-48 my-2.5 justify-between overflow-hidden"}>
      <CardHeader className={"p-2 gap-0"}>
        <CardTitle>{addressCardItem?.notes}</CardTitle>
      </CardHeader>
      <CardContent className={"p-2 py-0"}>
        <Label className={"text-md font-normal"}>
          {addressCardItem?.address}  
        </Label>
        <Label className={"text-md font-normal"}>{addressCardItem?.city}</Label>
        <Label className={"text-md font-normal"}>
          {addressCardItem?.phone}
        </Label>
        <Label className={"text-md font-normal"}>
          {addressCardItem?.pincode}
        </Label>
      </CardContent>
      <CardFooter className={"flex justify-between p-2"}>
        <Button
          onClick={() => {
            handleAddressEdit(addressCardItem._id, addressCardItem);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleAddressDelete(addressCardItem._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
