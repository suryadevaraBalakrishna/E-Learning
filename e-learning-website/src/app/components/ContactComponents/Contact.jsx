'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Contact() {
  let [contactDetails,setcontactDetaiils]=useState('');
  
  useEffect(()=>{
   axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_SETTING)
   .then((result)=>{
     if(result.data._status==true){
        setcontactDetaiils(result.data._data);

     }else{
        setcontactDetaiils('');
     }
   }).catch((error)=>{
    console.log(error);
   })

  },[])



  return (
   <div className="container-xxl py-5">
  <div className="container">

    {/* Section Title */}
    <div
      className="text-center wow fadeInUp"
      data-wow-delay="0.1s"
      style={{
        visibility: "visible",
        animationDelay: "0.1s",
        animationName: "fadeInUp"
      }}
    >
      <h6 className="section-title bg-white text-center text-primary px-3">
        Contact Us
      </h6>
      <h1 className="mb-5">Contact For Any Query</h1>
    </div>

    <div className="row g-4">

      {/* Contact Info */}
      <div
        className="col-lg-6 col-md-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeInUp"
        }}
      >
        <h5 className='mb-5'>Get In Touch</h5>
       

        {/* Office */}
        <div className="d-flex align-items-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="fa fa-map-marker text-white"></i>
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Office</h5>
            <p className="mb-0">123 Street, New York, USA</p>
          </div>
        </div>

        {/* Mobile */}
        <div className="d-flex align-items-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="fa fa-phone text-white"></i>
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Mobile</h5>
            <p className="mb-0"><a href={`tel:${contactDetails.phone}`} className='text-decoration-none text-dark'>{contactDetails.phone}</a></p>
          </div>
        </div>

        {/* Email */}
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="fa fa-envelope-open text-white"></i>
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Email</h5>
            <p className="mb-0"><a href={`mailto:${contactDetails.email}`} className='text-decoration-none text-dark'>{contactDetails.email}</a></p>
          </div>
        </div>

      </div>

      {/* Google Map */}
      <div
        className="col-lg-6 col-md-6 wow fadeInUp"
        data-wow-delay="0.3s"
        style={{
          visibility: "visible",
          animationDelay: "0.3s",
          animationName: "fadeInUp"
        }}
      >
        <iframe
          className="position-relative rounded w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
          style={{ minHeight: "300px", border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        ></iframe>
      </div>

    </div>
  </div>
</div>
  )
}
