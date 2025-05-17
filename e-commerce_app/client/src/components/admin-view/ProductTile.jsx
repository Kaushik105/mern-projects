import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/admin/productsSlice";
import { toast } from "sonner";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductDialog,
  setCurrentEditedId,
}) {
  const dispatch = useDispatch();
  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteProduct({ id: product._id })).then((data) => {
      if (data.paylaod.success) {
        toast.error(data.payload.message, {
          duration: 1500,
        });
        dispatch(fetchAllProducts());
      }
    });
  }

  return (
    <Card className="w-full max-w-[300px] flex items-center gap-3 p-0" >
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-[180px] rounded-t-lg"
        />
      </div>
      <CardContent className={"w-full pb-5 p-3"}>
        <h1 className="font-medium text-xl">{product.title}</h1>
        <span className="flex justify-between items-center">
          <p
            className={`font-semibold text-md ${
              product.salesPrice > 0 && "line-through text-gray-700"
            }`}
          >
            ${product.price}
          </p>
          {product.salesPrice > 0 && (
            <p className="font-semibold text-md">${product.salesPrice}</p>
          )}
        </span>
      </CardContent>
      <CardFooter className={"w-full pb-1.5 p-3"}>
        <div className="w-full flex justify-between">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setFormData(product);
              setCurrentEditedId(product._id);
            }}
          >
            Edit
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
