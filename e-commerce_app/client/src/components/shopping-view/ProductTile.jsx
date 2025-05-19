import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Button } from "../ui/button";

function ShoppingProductTile({product, handleGetProductDetails, handleAddtoCart}) {
  return (
    <Card className={"w-full max-w-sm mx-auto p-0 gap-2"}>
      <div
        onClick={() => {
          handleGetProductDetails(product._id);
        }}
      >
        <div className="relative">
          <img
            src={product?.image}
            className="w-full h-[200px] object-cover rounded-t-lg"
            alt={product?.title}
          />
          {product?.totalStock === 0 ? (
            <Badge
              className={
                "absolute top-2 left-2 px-2.5 rounded-full bg-yellow-200 text-red-600 text-[15px]"
              }
            >
              {" "}
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge
              className={
                "absolute top-2 left-2 px-2.5 rounded-full   bg-yellow-200 text-red-600 text-[15px]"
              }
            >{`${product?.totalStock} items left`}</Badge>
          ) : product?.salesPrice > 0 ? (
            <Badge
              className={
                "absolute top-2 left-2 px-2.5 rounded-full  w-13 bg-yellow-200 text-red-600 text-[15px]"
              }
            >
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className={"p-2 pt-0"}>
          <h2 className="font-semibold text-lg">{product?.title}</h2>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex  items-center justify-between">
            {product?.salesPrice > 0 ? (
              <>
                <span
                  className={`${
                    product?.salesPrice > 0 ? "line-through" : ""
                  } text-lg font-semibold text-primary`}
                >
                  ${product?.price}
                </span>
                <span className={`text-lg font-semibold text-primary`}>
                  ${product?.salesPrice}
                </span>
              </>
            ) : product?.salesPrice > 0 ? (
              <span className={`text-lg font-semibold text-primary`}>
                ${product?.salesPrice}
              </span>
            ) : (
              <span className={`text-lg font-semibold text-primary`}>
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className={"pb-2"}>
        {product?.totalStock === 0 ? (
          <Button className={"w-full opacity-60 cursor-not-allowed"}>
            Out Of Stock
          </Button>
        ) : (
          <Button
            className={"w-full"}
            onClick={() => {
              handleAddtoCart(product?._id, product?.totalStock);
            }}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
