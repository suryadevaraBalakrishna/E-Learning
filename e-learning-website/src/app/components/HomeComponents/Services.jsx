'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Services() {
   let [service,setservice]=useState([]);
   let [imagePath,setimagePath]=useState('');

   useEffect(()=>{
     axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_SERVICE)
     .then((result)=>{
        if(result.data._status==true){
          setservice(result.data._data);
          setimagePath(result.data._service_image_path);
        }else{
          setservice([])
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
    <div className="row g-4">
      
     {service.length!=0 ?
    (
      <>
       {service.map((items,index)=>{
        return(
             <div
        className="col-lg-4 col-sm-6 wow fadeInUp"
        data-wow-delay="0.1s"
         key={index}
        style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeInUp" } }
      >
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <img src={imagePath+items.image} className='img-fluid'/>
            <h5 className="mb-3">{items.title}</h5>
            <p>
            {items.description}
            </p>
          </div>
        </div>
      </div>
        )
      })}
      </>
    )
    :
    (<p></p>) 
    }


   

  

    </div>
  </div>
</div>
  )
}
