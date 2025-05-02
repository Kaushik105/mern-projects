import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useState } from "react";
import ProductImageUpload from "../../components/admin-view/ImageUpload";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(true);

  const onSubmit = () => {
    
    console.log(formData)
  };
;
  
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className='className="grid gap-4 md:grid-cols-5 lg:grid-cols-4"'></div>
      <Sheet
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
        }}
        open={openCreateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto p-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-medium">
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            setImageFile={setImageFile}
            imageFile={imageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />

          <div className="py-4">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add"}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
