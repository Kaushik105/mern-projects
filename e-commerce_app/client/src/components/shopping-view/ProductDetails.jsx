import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews } from "@/store/shop/reviewSlice";
import { toast } from "sonner";

function ProductDetailsDialog({
  productDetails,
  open,
  setOpen,
  handleAddtoCart,
}) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [ratingValue, setratingValue] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();

  function handleRatingValue(value) {
    setratingValue(value);
  }

  function handleReviewSubmit() {
    if (reviewMsg.length > 3 && ratingValue) {
      dispatch(
        addReview({
          reviewMessage: reviewMsg,
          reviewValue: ratingValue,
          username: user.username,
          productId: productDetails._id,
          userId: user._id,
        })
      ).then((data) => {

        if (data.payload?.success) {

          toast.success("Review submitted successfully");
        } else {
          toast.info(data?.payload?.message);
        }
        dispatch(getReviews(productDetails._id));
        setReviewMsg("");
        setratingValue(0);
      });
    }
  }

  useEffect(() => {
    if (productDetails) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setReviewMsg("");
        setratingValue(0);
      }}
    >
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
            <StarRating rating={productDetails?.averageReview} />
            <span>
              <p className="text-muted-foreground ml-1 text-lg font-semibold">
                ({productDetails?.averageReview})
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
            {reviews && reviews.length > 0
              ? reviews.map((item) => (
                  <div key={item._id} className="flex gap-3 pt-1">
                    <Avatar className={"w-10 h-10 border mt-0.5"}>
                      <AvatarFallback
                        className={"bg-black text-sm text-white font-semibold"}
                      >
                        {item?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="mt-0 font-semibold">{item?.username}</div>
                      <div className="">
                        <StarRating rating={item?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground text-sm font-normal">
                        {item?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              : null}

            <div className="flex flex-col gap-3 pt-1">
              <Label>Add a review</Label>
              <StarRating
                rating={ratingValue}
                handleRatingValue={handleRatingValue}
              />
              <Input
                type={"text"}
                value={reviewMsg}
                onChange={(e) => {
                  setReviewMsg(e.target.value);
                }}
                placeholder="write a review..."
              />
              <Button
                onClick={() => {
                  handleReviewSubmit();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
