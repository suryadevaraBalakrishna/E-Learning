'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ExpertInstructors() {
  let [team,setteam]=useState([])
    let [imagePath,setimagePath]=useState('');
  

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_TEAM)
    .then((result)=>{
        if(result.data._status==true){
           setteam(result.data._data);
           setimagePath(result.data._team_image_path);
        }else{
           setteam([])
           setimagePath('');
        }
    })
    .catch((error)=>{
       console.log(error);
    })
  })


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
        Instructors
      </h6>
      <h1 className="mb-5">Expert Instructors</h1>
    </div>

    <div className="row g-4">

      {/* Instructor 1 */}
      {team.length !=0 ?(
        <>
        {team.map((items,index)=>{
          return(
              <div
              key={index}
        className="col-lg-3 col-md-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{
          visibility: "visible",
          animationDelay: "0.1s",
          animationName: "fadeInUp"
        }}
      >
        <div className="team-item bg-primary text-light">
          <div className="overflow-hidden">
            <img className="img-fluid" src={imagePath+items.image} alt="Instructor" />
          </div>

          <div
            className="position-relative d-flex justify-content-center"
          >
           
          </div>

          <div className="text-center p-2">
            <h5 className="mb-0">{items.name}</h5>
            <small>{items.designation}</small>
          </div>
        </div>
      </div>
          )
        })}
        </>
           
      )
      :(
       <p></p>
      )
    }
     

       
      

   

    </div>
  </div>
</div>
  )
}
