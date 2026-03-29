'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function AboutUs() {
  let [About,setAbout]=useState('');
   let [imagePath,setimagePath]=useState('');

    useEffect(()=>{
     axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_ABOUT)
     .then((result)=>{
        if(result.data._status==true){
          setAbout(result.data._data);
          setimagePath(result.data._about_setting_image_path);
        }else{
          setAbout([])
          setimagePath('');
        }
     })
     .catch(()=>{
           toast.error(result.data._message);
        })
   },[])

  return (
 <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-5">

      {/* Image Section */}
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{
          minHeight: "400px",
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeInUp"
        }}
      >
        <div className="position-relative h-100">
          {About &&(
           <img
            className="img-fluid position-absolute w-100 h-100"
            src={imagePath+About.image}
            alt="About"
            style={{ objectFit: "cover" }}
          />
          )
        }
        </div>
      </div>

      {/* Content Section */}
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.3s"
        style={{
          visibility: "visible",
          animationDelay: "0.3s",
          animationName: "fadeInUp"
        }}
      >
        <h6 className="section-title bg-white text-start text-primary pe-3">
          {About?.sub_heading}
        </h6>

        <h1 className="mb-4"> {About?.heading}</h1>

        <p className="mb-4">
          {About?.description}
        </p>

       
        {About &&(
          <a className="btn btn-primary py-3 px-5 mt-2" href={About?.button_link}>
          {About?.button_txt}
        </a>
        )}
      </div>

    </div>
  </div>
</div>
  )
}
