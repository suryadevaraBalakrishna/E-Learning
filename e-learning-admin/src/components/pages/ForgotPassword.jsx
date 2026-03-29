import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';


export default function ForgotPassword() {

  let [submitStatus, setsubmitStatus] = useState(false);

  let handleSubmit = (event) => {
    event.preventDefault();
    setsubmitStatus(true);
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_USER_FORGOT_PASSWORD, event.target)
      .then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
        } else {
          toast.error(result.data._message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      })


  }

  return (
    <section className="py-2">
      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-lg-4 col-md-6">

            {/* Logo */}


            {/* Card */}
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">

                <h5 className="text-center mb-4">Enter Email</h5>

                <form autoComplete="off" onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                  </div>

                  <button
                    type="submit" disabled={submitStatus}
                    className="btn btn-primary w-100"
                  >
                    Enter Email
                  </button>

                </form>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
