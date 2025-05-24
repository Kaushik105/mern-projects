import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BathIcon,
  BusIcon,
  CakeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  FlagIcon,
  MicIcon,
  NetworkIcon,
  NutIcon,
  ShirtIcon,
  ShovelIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/productsSlice";
import { useNavigate } from "react-router-dom";
import { createCart } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { getFeatureImages } from "@/store/commonSlice";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudIcon },
  { id: "kids", label: "Kids", icon: CakeIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: ShovelIcon },
];

const brands = [
  { id: "nike", label: "Nike", icon: NetworkIcon },
  { id: "adidas", label: "Adidas", icon: BusIcon },
  { id: "puma", label: "Puma", icon: MicIcon },
  { id: "levi", label: "Levi's", icon: BathIcon },
  { id: "zara", label: "Zara", icon: NutIcon },
  { id: "h&m", label: "H&M", icon: FlagIcon },
];

function ShoppingHome() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const navigate = useNavigate();

  function handleNavigateToListing(filterItem, sectionId) {
    sessionStorage.removeItem("filters");
    let filters = {
      [sectionId]: [filterItem],
    };
    sessionStorage.setItem("filters", JSON.stringify(filters));
    navigate("/shop/listing");
  }

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
    dispatch(getFeatureImages());
  }, []);

  useEffect(() => {
    dispatch(getFilteredProducts({ filter: {}, sortBy: "price-lowtohigh" }));
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1 + featureImageList.length) % featureImageList.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [setCurrentSlide]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[500px] overflow-hidden">
        {featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${
              index == currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant={"outline"}
          size={"icon"}
          className={"absolute top-1/2 left-4 transform translate-y-1/2"}
          onClick={() => {
            setCurrentSlide(
              (prev) =>
                (prev - 1 + featureImageList.length) % featureImageList.length
            );
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => {
            setCurrentSlide(
              (prev) => (prev + 1 - featureImageList.length) % featureImageList.length
            );
          }}
          variant={"outline"}
          size={"icon"}
          className={"absolute top-1/2 right-4 transform translate-y-1/2"}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <section className="w-full py-6 mt-5">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Shop By Category</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6 my-6 lg:grid-cols-5">
          {categories.map((categoryItem, index) => (
            <Card
              key={categoryItem.id}
              className={"shadow hover:shadow-lg p-4 h-38"}
              onClick={() =>
                handleNavigateToListing(categoryItem.id, "category")
              }
            >
              <CardContent
                className={"flex items-center justify-center flex-col gap-6"}
              >
                <categoryItem.icon className="w-14 h-14" />
                <span className="text-lg font-semibold">
                  {categoryItem.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full py-6 mt-5">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Shop By Brand</h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 my-6 ">
          {brands.map((brandItem, index) => (
            <Card
              key={brandItem.id}
              className={"shadow hover:shadow-lg p-4 h-38"}
              onClick={() => handleNavigateToListing(brandItem.id, "brand")}
            >
              <CardContent
                className={"flex items-center justify-center flex-col gap-6"}
              >
                <brandItem.icon className="w-14 h-14" />
                <span className="text-lg font-semibold">{brandItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="w-full py-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Featured Products</h1>
        </div>
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {productList && productList.length > 0
            ? productList.map((producItem) => (
                <ShoppingProductTile
                  key={producItem._id}
                  product={producItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </section>
      .
      <ProductDetailsDialog
        setOpen={setOpenProductDialog}
        open={openProductDialog}
        productDetails={productDetails}
        handleAddtoCart={handleAddtoCart}
      />
    </div>
  );
}

export default ShoppingHome;
