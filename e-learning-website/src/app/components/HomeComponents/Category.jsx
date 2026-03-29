'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Category() {
      let [category,setcategory]=useState([])
    let [imagePath,setimagePath]=useState('');
  

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_CATEGORY)
    .then((result)=>{
        if(result.data._status==true){
           setcategory(result.data._data);
           setimagePath(result.data._categories_image_path);
        }else{
           setcategory([])
           setimagePath('');
        }
    })
    .catch((error)=>{
       console.log(error);
    })
  },[])

  return (
     <div className="container-xxl py-5">
  <div className="container">

    {/* Section Title */}
    <div className="text-center mb-5">
      <h6 className="section-title bg-white text-primary px-3">
        Categories
      </h6>
      <h1 className="mb-3">Courses Categories</h1>
    </div>

    <div className="row g-4">

      {category.length !== 0 ? (
        category.map((items) => (
          <div
            key={items._id}
            className="col-lg-3 col-md-4 col-sm-6"
          >
            <div className="card h-100 shadow-sm border-0 category-card">

              {/* Image */}
              <div className="category-image-wrapper">
                <img
                  src={imagePath + items.image}
                  alt={items.name}
                  className="category-image"
                />
              </div>

              {/* Content */}
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <h5 className="fw-semibold mb-0">
                  {items.name}
                </h5>
              </div>

            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>No Categories Found</p>
        </div>
      )}

    </div>
  </div>
</div>
  )
}
