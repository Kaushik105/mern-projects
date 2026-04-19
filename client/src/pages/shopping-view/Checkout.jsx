import React, { useEffect, useState } from "react";
import account from "../../assets/account.avif";
import Address from "@/components/shopping-view/Address";
import CartItemsContent from "@/components/shopping-view/cartItemsContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/orderSlice";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

function ShoppingCheckout() {
  const { cartItems, cartId } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [cartTotal, setcartTotal] = useState(0);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  function handleInitiatePaypalPayment() {
    if (currentSelectedAddress == null) {
      toast.error("please select address to proceed");
      return
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        duration: 900,
      });
      return
    }
    const orderData = {
      userId: user._id,
      cartId,
      cartItems: cartItems.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        price:
          singleCartItem?.salesPrice > 0
            ? singleCartItem?.salesPrice
            : singleCartItem?.price,
        image: singleCartItem?.image,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      paymentMethod: "paypal",
      totalAmount: cartTotal,
      orderStatus: "pending",
      paymentStatus: "pending",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    setIsPaymentStart(true);
    dispatch(createNewOrder(orderData)).then((data) => {
      
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

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

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
          <Address
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
          />
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
          <Button onClick={handleInitiatePaypalPayment} className={"w-full"}>
            {isPaymentStart ? (
              <BeatLoader loading={isPaymentStart} color="#FFF" />
            ) : (
              "Checkout with PayPal"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
