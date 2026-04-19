import React from "react";
import account from "../../assets/account.avif";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/Address";
import ShoppingOrdersView from "./Orders";

function ShoppingAccount() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-[350px] overflow-hidden ">
        <img
          src={account}
          alt=""
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4 m-5 rounded">
        <Tabs
          defaultValue="Orders"
          className="w-[90%] lg:border-r-2 mx-auto sm:px-5 overflow-auto"
        >
          <TabsList>
            <TabsTrigger value="Orders">Orders</TabsTrigger>
            <TabsTrigger value="Addresses">Addresses</TabsTrigger>
          </TabsList>
          <TabsContent value="Orders">
            <ShoppingOrdersView />
          </TabsContent>
          <TabsContent value="Addresses" className={"w-full"}>
            <Address />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ShoppingAccount;
