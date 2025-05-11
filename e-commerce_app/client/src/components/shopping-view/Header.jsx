import { HouseIcon, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import CartWrapper from "./cartWrapper";
import { fetchCartItems } from "@/store/shop/cartSlice";



function MenuItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleNavigate(getCurrentMenuItem) {}

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
          onClick={handleNavigate(menuItem)}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightcontent() {
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{isAuthenticated, user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.shopCart)

  function handleLogout(){
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(fetchCartItems(user._id))
  
  }, [dispatch])
  

  return (
    <div className="flex lg:item-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
          }}
          variant="outline"
          size={"icon"}
          className={"relative"}
        >
          <ShoppingCart className="w-6 h-6" />
        </Button>
        <CartWrapper cartItems={cartItems}/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className={"bg-black"}>
            <AvatarFallback className="bg-black text-white m font-bold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 mt-3.5">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <User className="mr-2 w-4 h-4" /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 w-4 h-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link
          to={"/shop/home"}
          className="flex items-center justify-center gap-1.5"
        >
          <HouseIcon className="h-6 w-6" />
          <span className="font-bold text-lg">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"} className={"lg:hidden"}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className={"w-full max-w-xs p-5  pt-7 lg:hidden block"}
          >
            <MenuItems />
            <HeaderRightcontent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightcontent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
