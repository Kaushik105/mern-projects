import { addressFormControls } from "@/config";
import React, { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const { addressList } = useSelector((state) => state.shopAddress);

  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleAddressDelete(addressId) {
    dispatch(deleteAddress({ userId: user._id, addressId })).then((data) => {
      if (data.payload?.success) {
        toast.success("address deleted sucessfully");
        dispatch(fetchAddress({ userId: user._id }));
      }
    });
  }

  function handleAddressFormSubmit(e) {
    e.preventDefault();
    dispatch(
      addAddress({ addressData: { ...formData, userId: user._id } })
    ).then((data) => {
      if (data.payload?.success) {
        toast.success("New address added");
        console.log("successful");
        dispatch(fetchAddress({ userId: user._id })).then((data) =>
          console.log(data)
        );
        setFormData(initialFormData);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAddress({ userId: user._id }));
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .map((item) => formData[item].trim() !== "")
      .every((item) => item);
  }

  return (
    <div>
      <div className="border p-2 rounded-lg">
        <p className="text-lg font-semibold">Saved Addresses</p>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3  gap-5 p-1">
          {addressList && addressList.length > 0
            ? addressList.map((item) => (
                <AddressCard
                  addressCardItem={item}
                  handleAddressDelete={handleAddressDelete}
                  key={item._id}
                />
              ))
            : null}
        </div>
      </div>
      <CommonForm
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAddressFormSubmit}
        buttonText={"Add"}
        isBtnDisabled={!isFormValid()}
      />
    </div>
  );
}

export default Address;
