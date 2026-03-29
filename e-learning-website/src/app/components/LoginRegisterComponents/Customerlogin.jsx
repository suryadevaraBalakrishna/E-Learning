'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userDetails } from '@/app/slice/loginSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function CustomerLogin() {
  let [showpassword, setshowpassword] = useState(false);

  const [formSubmit, setformSubmit] = useState(false);

  const [loginStatus, setloginStatus] = useState(false);


  const dispatch=useDispatch();

  const router=useRouter();


  let handleRegister=(event)=>{
    event.preventDefault();
     let formData=new FormData();

     formData.append('name',event.target.name.value);
     formData.append('email',event.target.email.value);
     formData.append('mobile_number',event.target.mobile_number.value);
     formData.append('password',event.target.password.value);
     let file = event.target.image.files[0];
      if (file) {
            formData.append("image", file);
      }

     axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_USER_REGISTER,formData)
     .then((result)=>{
      if(result.data._status==true){
        setformSubmit(true);
        toast.success('Now you can login with your credentials');
        event.target.reset();
      }else{
           setformSubmit(false);
             toast.error(result.data._message);
      }

     }).catch((error)=>{
       toast.error(error.message)
       setformSubmit(false);
     })


  }



  const handleLogin=(event)=>{
      event.preventDefault();
    setloginStatus(true);
     
      axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_USER_LOGIN,event.target)
     .then((result)=>{
       if(result.data._status==true){
         toast.success(result.data._message);
           setloginStatus(true);
         dispatch(userDetails({
          user: result.data._data,
          token: result.data._token
         }))
         Cookies.set('token',result.data._token);
         router.push('/my-dashboard');
       }else{
        toast.error(result.data._message);
        setloginStatus(false);
       }
     })
     .catch(()=>{
       toast.error('Something went wrong');
       setloginStatus(false);
     })
  }

  return (

    <div className="container py-5">

      <div className="row g-4">

        {/* LOGIN */}
        <div className="col-lg-6">

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h3 className="mb-4 text-center">Login</h3>

              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type={showpassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                  />
                </div>
                <div className="check">
                  <input type="checkbox" onChange={() => setshowpassword(!showpassword)} />show password

                </div>
                <a href='/forgot-password' className='text-decoration-none'>forgot password</a>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2"
                >
                  Login
                </button>

              </form>

            </div>
          </div>

        </div>


        {/* REGISTER */}
        <div className="col-lg-6">

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h3 className="mb-4 text-center">Register</h3>

              <form onSubmit={handleRegister} encType='multipart/form-data'>

                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    name="mobile_number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create password"
                    name="password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Create password"
                    name="image"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-2"
                >
                  Register
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

    </div>

  )
}