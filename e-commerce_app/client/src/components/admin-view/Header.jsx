import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import { toast } from "sonner";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user._id);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser(id)).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.data, {
          duration: 1500,
        });
      }
    });
  }

  return (
    <header className="flex items-center justify-between px-4 bg-background border-b">
      <Button
        className="lg:hidden sm:black"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AlignJustify />
        <span className="sr-only"></span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
