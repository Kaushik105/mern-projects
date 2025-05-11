import React, { useEffect, useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemsContent from "./cartItemsContent";
import { Button } from "../ui/button";

function CartWrapper({ cartItems }) {
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
      <SheetContent>
        <SheetHeader className={"p-2 mt-2"}>
          <SheetTitle className={"text-xl font-bold"}>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="sm:max-w-sm flex flex-col gap-3 p-2">
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
          <Button>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </div>
  );
}

export default CartWrapper;
