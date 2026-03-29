import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userDetails } from '../../slice/loginSlice';
import { toast } from 'react-toastify';

export default function Login() {

  let [loginStatus,setloginStatus]=useState(false);

  const dispatch=useDispatch();

  const navigate=useNavigate();

  let handlelogin=(event)=>{
    event.preventDefault();
    setloginStatus(true);
    axios.post(import.meta.env.VITE_API_ADMIN_URL+import.meta.env.VITE_API_USER_LOGIN,event.target)
    .then((result)=>{
      if(result.data._status==true){
         toast.success(result.data._message);
         dispatch((userDetails({
           user:result.data._data,
            token:result.data._token
         })))
          navigate('/dashboard');
      }else{
           toast.error(result.data._message)
        setloginStatus(false);
      }

    }).catch(()=>{
      toast.error('something went wrong')
       setloginStatus(false);
   })
  }




  return (
   <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-12 mx-auto tm-login-col">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="tm-block-title mb-4">Welcome to Dashboard, Login</h2>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <form  method="post" class="tm-login-form" onSubmit={handlelogin}>
                  <div className="form-group">
                    <label for="username">Email</label>
                    <input  type="email" className="form-control" name="email"  required/>
                  </div>
                  <div className="form-group mt-3">
                    <label for="password">Password</label>
                    <input  type="password" className="form-control" name="password"  required/>
                  </div>
                  <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary btn-block text-uppercase" disabled={loginStatus}>

                      Login
                    </button>
                  </div>
                  <a href='/forgot-password' className="mt-5 btn btn-primary btn-block text-uppercase">
                    Forgot your password?
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
