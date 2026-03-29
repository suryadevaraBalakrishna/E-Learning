'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function ResetPassword() {
  
 let [submitStatus,setsubmitStatus]=useState(false);

 const searchParams=useSearchParams();
 const token=searchParams.get('token');

 const router=useRouter();

 let handleSubmit=(event)=>{
  event.preventDefault();
   setsubmitStatus(true);

   axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_USER_RESET_PASSWORD,event.target,{
       headers: {
            Authorization: `Bearer ${token}`
    }
   }).then((result)=>{
      if(result.data._status==true){
       toast.success(result.data._message);
       router.push('/login-register')
       setsubmitStatus(true);
    }else{
         toast.error(result.data._message);
         setsubmitStatus(true);
    }
   }).catch((error)=>{
     toast.error(error);
     setsubmitStatus(false);
  })
 }



  return (
  <div className="py-5 bg-white">
  <div className="container">
    <div className="row justify-content-center">

      <div className="col-lg-4 col-md-6 col-12">
        <div className="account_form border p-4 shadow-sm rounded">

          <h2 className="h4 mb-4 text-center">Reset Password</h2>

          <form autoComplete="off" onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                New Password <span className="text-danger">*</span>
              </label>

              <input
                type="password"
                name="new_password"
                className="form-control"
              />
            </div>

                <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>

              <input
                type="password"
                name="confirm_password"
                className="form-control"
              />
            </div>


             
            <button
              type="submit"
              className="btn btn-success w-100"
             disabled={submitStatus}>
        {submitStatus ? 'Sending...' : 'Reset Password ' }
            </button>

          </form>

        </div>
      </div>

    </div>
  </div>
</div>
  )
}
