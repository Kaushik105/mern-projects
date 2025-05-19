import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createCart } from "@/store/shop/cartSlice";
import { getProductDetails } from "@/store/shop/productsSlice";
import { clearSearchResults, getSearchResults } from "@/store/shop/searchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Search() {
  const [keyword, setkeyword] = useState("");
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const [openProductDialog, setOpenProductDialog] = useState(false);

  function handleGetProductDetails(productId) {
    if (productDetails && productDetails._id == productId) {
      setOpenProductDialog(true);
    } else {
      dispatch(getProductDetails(productId)).then((data) => {
        if (data.payload.success) {
          setOpenProductDialog(true);
        }
      });
    }
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems || [];
    if (getCartItems.length) {
      let indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId == getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        let getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast.error(`only ${getTotalStock} items can be added`);
          return;
        }
      }
    }

    dispatch(
          createCart({
            userId: user._id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data.payload.success) {
            toast.success("Product added to cart", {
              duration: 1500,
            });
          }
        });
  }

  useEffect(() => {
    let searchTimeOut = setTimeout(() => {
      if (keyword.trim() !== "" && keyword.trim().length > 3) {
        dispatch(getSearchResults(keyword));
      } else {
        dispatch(clearSearchResults());
      }
    }, 1000);

    return () => clearTimeout(searchTimeOut);
  }, [keyword]);

  return (
    <div className="container w-full mx-auto p-3">
      <div className="w-full flex flex-col gap-4">
        <div className=" w-full flex items-center mb-1">
          <Input
            value={keyword}
            onChange={(e) => {
              setkeyword(e.target.value);
            }}
            className={"py-6 max-w-5xl mx-auto"}
            placeholder="Search products....."
          />
        </div>
        <Separator />
        {searchResults.length <= 0 && (
          <p className="text-2xl font-semibold text-center">
            No products found
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {searchResults?.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleAddtoCart={handleAddtoCart}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      </div>
      <ProductDetailsDialog
        setOpen={setOpenProductDialog}
        open={openProductDialog}
        productDetails={productDetails}
        handleAddtoCart={handleAddtoCart}
      />
    </div>
  );
}
export default Search;
