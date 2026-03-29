'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function HeroBanner() {
    var settings = {
        dots: true,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay:true
    };

    let [sliderData,setsliderData]=useState([]);
    let [sliderimagePath,setsliderimagePath]=useState();
    
    useEffect(()=>{
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_SLIDER)
        .then((result)=>{
           if(result.data._status==true){
             setsliderData(result.data._data);
             setsliderimagePath(result.data._slider_image_path);
           }else{
             setsliderData([]);
           }
        })
        .catch(()=>{
           toast.error(result.data._message);
        })
    },[])

    return (
        <div className='hero-wrapper overflow-hidden'>
            {sliderData.length!=0 ?
            (
                <Slider {...settings}>
                 {sliderData.map((items,index)=>{
                    return(

                        <div key={index}>
                    <div
                        className="hero-slide"
                        style={{ backgroundImage: `url(${sliderimagePath+items.image})` }}
                    >
                        <div className="hero-overlay">
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-lg-8 text-white">
                                        <h5 className="text-uppercase mb-3">
                                            {items.subheading}
                                        </h5>
                                        <h1 className="display-custom mb-4">
                                            {items.heading}
                                        </h1>
                                        <p className="fs-5 mb-4">
                                            {items.description}
                                        </p>
                                        <a href={items.button_link} className="btn btn-primary me-3">
                                            {items.button_txt}
                                        </a>
                                        <a href={items.button_link_two} className="btn btn-light">
                                            {items.button_txt_two}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    )
                 })}

                </Slider> 
            )
            
            :
            (<p></p>)}




          
        </div>
    )
}
