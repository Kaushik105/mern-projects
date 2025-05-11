import CommonForm from '@/components/common/Form';
import { registerFormControls } from '@/config';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/store/auth-slice';
import { toast } from 'sonner';

const initialState = {
  username: '',
  email: '',
  password: ''
}

function Register() {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => { 
    e.preventDefault()
    dispatch(registerUser(formData)).then((user) => { 
      console.log(user);
      if (user.payload?.success) {
        navigate("/auth/login")
        toast.success(user.payload?.message, {
          duration: 1500,
        });
      }else{
        toast.error(user.payload?.message, {
          duration: 1500,
        });
      }
     })
   }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
      formControls={registerFormControls}
      setFormData={setFormData}
      formData={formData}
      onSubmit={onSubmit}
      buttonText={"Sign Up"}/>
    </div>
  );
}

export default Register
