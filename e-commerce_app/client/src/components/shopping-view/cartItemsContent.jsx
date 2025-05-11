import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DiamondPercent, Minus, Plus, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCartItems, updateCart } from "@/store/shop/cartSlice";
import { toast } from "sonner";

function CartItemsContent({ cartItem }) {
  const dispatch  = useDispatch()
  const {user} = useSelector(state => state.auth)


  function handleDeleteCartItem(productId){
    dispatch(deleteCart({userId: user._id, productId})).then((data) => { if (data.payload.success) {
      toast.error("Removed from cart", {
        duration: 1500,
      });
    } })
    
  }

  function handleCartUpdateQuantity(productId, typeOfUpdation){    
    if (typeOfUpdation === "minus") {
      dispatch(updateCart({userId: user._id, productId, quantity: -1}))
    }else{
      dispatch(updateCart({ userId: user._id, productId, quantity: 1 }))
    }
  }
  const [value, setvalue] = useState(0)
  return (
    <>
      {cartItem ? (
        <div className="flex justify-between w-full">
          <div className="flex gap-3">
            <img
              src={cartItem?.image}
              alt={cartItem?.title}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex flex-col justify-between">
              <p className="font-semibold p-0 mt-[-7px] text-lg">
                {cartItem.title}
              </p>
              <span className="flex gap-1">
                <Button
                  variant={"outline"}
                  className={"bg-background w-5 h-6"}
                  disabled={cartItem.quantity == 1}
                  onClick={() => {
                    handleCartUpdateQuantity(cartItem.productId, "minus");
                  }}
                >
                  <Minus className="text-black" />
                </Button>
                <Input
                  className={
                    "max-w-8 h-6 text-black font-semibold py-0 px-1.5 disabled"
                  }
                  type={"text"}
                  value={cartItem.quantity}
                  onChange={(e) => {
                    setvalue(e.target.value);
                  }}
                />
                <Button
                  variant={"outline"}
                  className={"bg-background w-5 h-6"}
                  onClick={() => {
                    handleCartUpdateQuantity(cartItem.productId, "plus");
                  }}
                >
                  <Plus className="text-black" />
                </Button>
              </span>
            </div>
          </div>
          <div className="font-bold flex flex-col text- justify-between items-end">
            <p>
              {cartItem?.salesPrice > 0
                ? " $" + cartItem.salesPrice * cartItem.quantity
                : " $" + cartItem.price * cartItem.quantity}
            </p>
            <Trash
              onClick={() => {
                handleDeleteCartItem(cartItem.productId);
              }}
              className="w-5 h-5"
            />
          </div>
        </div>
      ) : null}
      <Separator />
    </>
  );
}

export default CartItemsContent;
