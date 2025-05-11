import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productsSlice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/ProductTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salesPrice: 0,
  averageReview: 0,
  totalStock: 0,
};

function AdminProducts() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(true);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminProducts.productList);

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setImageFile(null);
          setOpenCreateProductDialog(false);
          setUploadedImageUrl(null);
          toast.success("Product updated successfully", {
            duration: 1500,
          });
        }
      });
    } else {
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setImageFile(null);
          setOpenCreateProductDialog(false);
          setUploadedImageUrl(null);
          toast.success("Product added successfully", {
            duration: 1500,
          });
        }
      });
    }
  };
  

  function isFormValid() {
    return Object.keys(formData)
    .filter(key=>key!== "salesPrice")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
      <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-4">
        {products.map((productItem) => (
          <AdminProductTile
            key={productItem._id}
            product={productItem}
            setOpenCreateProductDialog={setOpenCreateProductDialog}
            setFormData={setFormData}
            setCurrentEditedId={setCurrentEditedId}
          />
        ))}
      </div>
      <Sheet
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
        open={openCreateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto p-4">
          <SheetHeader className={"p-0 pt-5"}>
            <SheetTitle className="text-2xl font-medium">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            setImageFile={setImageFile}
            imageFile={imageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-4">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
