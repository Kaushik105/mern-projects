import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

function ProductDetailsDialog({
  productDetails,
  open,
  setOpen,
  handleAddtoCart,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-[90vw] grid grid-cols-2 h-[450px] sm:max-w-[80vw] lg:max-w-[70vw] p-6 gap-8"
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          ></img>
        </div>
        <div className="flex flex-col gap-3">
          <span>
            <DialogTitle>
              <p className="text-3xl font-semibold">{productDetails?.title}</p>
            </DialogTitle>
            <p className="text-muted-foreground text-lg">
              {productDetails?.description}
            </p>
          </span>
          <div className="flex gap-2 p-3 justify-between text-2xl">
            <p
              className={`${
                productDetails?.salesPrice > 0 && "line-through"
              } font-bold`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salesPrice > 0 && (
              <p className=" font-bold">${productDetails?.salesPrice}</p>
            )}
          </div>
          <div className="flex gap-0.5 items-center">
            <StarIcon className="w-5 fill-primary" />
            <StarIcon className="w-5 fill-primary" />
            <StarIcon className="w-5 fill-primary" />
            <StarIcon className="w-5 fill-primary" />
            <StarIcon className="w-5 fill-primary" />
            <span>
              <p className="text-muted-foreground ml-1 text-lg font-semibold">
                (4.8)
              </p>
            </span>
          </div>
          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className={"w-full opacity-60 cursor-not-allowed"}>
                Out Of Stock
              </Button>
            ) : (
              <Button
                className={"w-full"}
                onClick={() => {
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  );
                }}
              >
                Add to cart
              </Button>
            )}
          </div>
          <div className="max-h-[180px] overflow-auto">
            <h2 className="text-lg font-semibold overflow-y-auto">Reviews</h2>
            <div className="flex gap-3 pt-1">
              <Avatar className={"w-10 h-10 border mt-0.5"}>
                <AvatarFallback
                  className={"bg-black text-sm text-white font-semibold"}
                >
                  SM
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mt-0 font-semibold">{"Kaushik Chowdhury"}</div>
                <div className="flex gap-1">
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                </div>
                <p className="text-muted-foreground text-sm font-normal">
                  This is an awesom product
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Avatar className={"w-10 h-10 border mt-0.5"}>
                <AvatarFallback
                  className={"bg-black text-sm text-white font-semibold"}
                >
                  SM
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mt-0 font-semibold">{"Kaushik Chowdhury"}</div>
                <div className="flex gap-1">
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                </div>
                <p className="text-muted-foreground text-sm font-normal">
                  This is an awesom product
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Avatar className={"w-10 h-10 border mt-0.5"}>
                <AvatarFallback
                  className={"bg-black text-sm text-white font-semibold"}
                >
                  SM
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mt-0 font-semibold">{"Kaushik Chowdhury"}</div>
                <div className="flex gap-1">
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                </div>
                <p className="text-muted-foreground text-sm font-normal">
                  This is an awesom product
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Avatar className={"w-10 h-10 border mt-0.5"}>
                <AvatarFallback
                  className={"bg-black text-sm text-white font-semibold"}
                >
                  SM
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mt-0 font-semibold">{"Kaushik Chowdhury"}</div>
                <div className="flex gap-1">
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                  <StarIcon className="w-5 fill-primary" />
                </div>
                <p className="text-muted-foreground text-sm font-normal">
                  This is an awesom product
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
