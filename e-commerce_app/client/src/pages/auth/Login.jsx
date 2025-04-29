import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData)).then((user) => { 
      console.log(user);
      
      if (user?.payload?.success) {
        toast.success(user?.payload?.message)
        navigate("/")
        console.log(user);
       }
       else{
        toast.error(user?.payload?.message)
       }
     })
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        setFormData={setFormData}
        formData={formData}
        onSubmit={onSubmit}
        buttonText={"Log In"}
      />
    </div>
  );
}
export default Login
