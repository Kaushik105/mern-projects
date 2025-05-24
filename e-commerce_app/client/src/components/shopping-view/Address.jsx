import { addressFormControls } from "@/config";
import React, { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
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

function Address({ setCurrentSelectedAddress, currentSelectedAddress }) {
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);
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

  function handleAddressEdit(currentEditedId, editFormData) {
    setCurrentEditedId(currentEditedId);
    setFormData({
      address: editFormData.address,
      city: editFormData.city,
      phone: editFormData.phone,
      pincode: editFormData.pincode,
      notes: editFormData.notes,
    });
  }

  function handleAddressFormEdit(e) {
    e.preventDefault();
    dispatch(
      editAddress({
        addressData: formData,
        userId: user._id,
        addressId: currentEditedId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialFormData);
        setCurrentEditedId(null);
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
        dispatch(fetchAddress({ userId: user._id })).then((data) => {});
        setFormData(initialFormData);
      } else {
        toast.error(data?.payload?.message);
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
                  currentSelectedAddress={currentSelectedAddress}
                  addressCardItem={item}
                  handleAddressDelete={handleAddressDelete}
                  handleAddressEdit={handleAddressEdit}
                  key={item._id}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              ))
            : null}
        </div>
      </div>
      <p className="text-xl font-bold my-4">Create New Address</p>
      <CommonForm
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={
          currentEditedId ? handleAddressFormEdit : handleAddressFormSubmit
        }
        buttonText={currentEditedId ? "Edit" : "Add"}
        isBtnDisabled={!isFormValid()}
      />
    </div>
  );
}

export default Address;
