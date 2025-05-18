import React, { useEffect, useState } from "react";
import account from "../../assets/account.avif";
import Address from "@/components/shopping-view/Address";
import CartItemsContent from "@/components/shopping-view/cartItemsContent";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [cartTotal, setcartTotal] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      let total = cartItems?.reduce((acc, item) => {
        let price = item?.salesPrice > 0 ? item.salesPrice : item.price;
        return acc + price * item.quantity;
      }, 0);
      setcartTotal(total);
    } else {
      setcartTotal(0);
    }
  }, [cartItems]);

  return (
    <div>
      <div className="w-full h-[350px] overflow-hidden ">
        <img
          src={account}
          alt=""
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-5 p-2">
        <div className="w-full px-2">
          <Address />
        </div>
        <div className="w-full px-2 border rounded-lg p-2">
          <div className="flex flex-col gap-3 p-2">
            <div className="flex flex-col gap-2 justify-between">
              {cartItems && cartItems.length > 0
                ? cartItems.map((item) => (
                    <CartItemsContent key={item.productId} cartItem={item} />
                  ))
                : null}
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Total</p>
              <p className="font-bold">{cartTotal}</p>
            </div>
          </div>
          <Button className={"w-full"}>
            Checkout with PayPal
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
