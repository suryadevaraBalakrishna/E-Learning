'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

export default function Footer() {

  let [setting, setSetting] = useState()
  let [menu, setMenu] = useState([])


  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_SETTING)
      .then((result) => {
        if (result.data._status == true) {
          setSetting(result.data._data);
          console.log(result.data._data);
        } else {
          setSetting('')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_MENU)
      .then((result) => {
        if (result.data._status == true) {
          setMenu(result.data._data);
          console.log(result.data._data);
        } else {
          setMenu([])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  let handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_NEWSLETTER,
      { email }
    )
      .then((result) => {
        if (result.data._status === true) {
          alert("Newsletter subscribed successfully!");
          e.target.reset();
        } else {
          alert(result.data._message || "Failed to subscribe.");
        }
      })
      .catch(() => {
        alert("An error occurred while subscribing.");
      });
  };




  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5">
      <div className="container-fluid py-5">
        <div className="row g-4">
          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Quick Links</h5>
            <div className="d-flex flex-column gap-2">
              {menu.map((item, index) => (
                <Link key={index} className="text-light text-decoration-none" href={item.link}>{item.name}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Contact</h5>
            <p className="mb-2">
              <a href={`tel:${setting?.phone}`} className="text-light text-decoration-none">{setting?.phone}</a>
            </p>
            <p className="mb-3">
              <a href={`mailto:${setting?.email}`} className="text-light text-decoration-none">{setting?.email}</a>
            </p>

          </div>



          {/* Newsletter */}
          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Newsletter</h5>
            <p className="small">
              Subscribe to our newsletter for latest updates.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-fluid border-top border-secondary pt-3 pb-3 p-0">
        <div className="row">
          <div className="col-12 text-center">
            © 2026 <span className="fw-bold">E Learning</span>. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>

  )
}
