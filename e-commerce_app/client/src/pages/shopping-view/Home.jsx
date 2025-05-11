import React, { useEffect, useState } from "react";
import slide1 from "../../assets/slide1.jpg";
import slide3 from "../../assets/slide3.jpg";
import slide2 from "../../assets/slide2.jpg";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { getFilteredProducts } from "@/store/shop/productsSlice";
import { loginFormControls } from "@/config";

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
  const slides = [slide1, slide2, slide3];
  const { productList } = useSelector((state) => state.shopProducts);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getFilteredProducts({ filter: {}, sortBy: "price-lowtohigh" }));
    setInterval(() => {
      setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
    }, 5000);
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
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
              (prev) => (prev - 1 + slides.length) % slides.length
            );
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => {
            setCurrentSlide(
              (prev) => (prev + 1 - slides.length) % slides.length
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
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 my-6 lg:grid-cols-5">
          {brands.map((categoryItem, index) => (
            <Card
              key={categoryItem.id}
              className={"shadow hover:shadow-lg p-4 h-38"}
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
      <section className="w-full py-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Featured Products</h1>
        </div>
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {productList && productList.length > 0
            ? productList.map((producItem) => (
                <ShoppingProductTile
                  key={producItem.productId}
                  product={producItem}
                />
              ))
            : null}
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
