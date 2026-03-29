'use client'
import CourseItem from '@/app/components/common/CourseItem'
import { addtoCart, deleteCart } from '@/app/slice/cartSlice'
import { addtowishlist, removefromwishlist } from '@/app/slice/wishlistSlice'
import { myStore } from '@/app/store/store'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {
    const {slug}=useParams()
    const [course,setcourse]=useState(null);
    const [courseimagepath, setcourseimagepath] = useState('');
    const [coursevideopath,setcoursevideopath]=useState('');
   
    let mycart=useSelector((myStore)=>myStore.cartReducer.cart);
    let mywish=useSelector((myStore)=>myStore.wishlist.coursewishlist);

    let dispatch=useDispatch();


     const [relatedCourse,setrelatedCourse]=useState([]);


   



    useEffect(()=>{
       if(!slug) return; 
     axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_COURSE_DETAILS,{
        slug:slug
     }).then((result)=>{
        if(result.data._status==true){
            setcourse(result.data._data);
            setcourseimagepath(result.data._course_image_path);
            setcoursevideopath(result.data._course_video_path);
        }else{
            setcourse(null)
             setcourseimagepath('');
             setcoursevideopath('');
        }
     }).catch((error)=>{
        console.log(error);
     })
    },[slug])



     let course_in_cart=mycart.filter((items)=>items.id==course?._id);
    let course_in_wishlist=mywish.filter((items)=>items.id==course?._id);


    let handleAddtoCart=()=>{
      let obj={
          qty:1,
            name:course?.name,
            price:course?.price,
            image:courseimagepath + course?.image,
            video:coursevideopath+ course?.video,
            id:course?._id
      }
      dispatch(addtoCart(obj));
    }


     let handleAddtoWishlist=()=>{
      let obj={
          qty:1,
            name:course?.name,
            price:course?.price,
            image:courseimagepath + course?.image,
            video:coursevideopath+ course?.video,
            id:course?._id
      }
      dispatch(addtowishlist(obj));
    }


    
    useEffect(()=>{
      if(!course) return;
        axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_COURSE_RELATED,{
          category_id:course.categories_id[0]._id,
           exclude_id: course._id
        })
        .then((result)=>{
          if(result.data._status==true){
           setrelatedCourse(result.data._data);
           console.log('txt',result.data._data);
       }else{
          toast.error('something went wrong');
       }
        }).catch((error)=>{
      toast.error(error);
    })
    },[course])
  
  return (
  <>
  {course?(
    <>
<div className="container py-5">

  <div className="row g-4">

    {/* Course Image */}
    <div className="col-lg-6">
      <div className="card border-0 shadow-sm">
        <img
          src={courseimagepath + course.image}
          className="img-fluid rounded"
          alt={course.name}
        />
      </div>
    </div>

    {/* Course Details */}
    <div className="col-lg-6">

      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">

          <h2 className="fw-bold mb-3">{course.name}</h2>

          <div className="mb-3">
            <span className="badge bg-primary me-2">
              {course.categories_id?.[0]?.name}
            </span>

            <span className="badge bg-success">
              Instructor: {course.instructor_id?.[0]?.name}
            </span>
          </div>

          <h4 className="text-primary mb-3">
            ₹ {course.price}
          </h4>

          <p className="text-muted">
            {course.description}
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            {course_in_cart.length==1 ?
                <button className="btn btn-danger px-4" onClick={()=>dispatch(deleteCart(course._id))}>
              Remove from Cart
            </button>
            :
              <button className="btn btn-primary px-4" onClick={()=>handleAddtoCart()}>
              Add to Cart
            </button>
            }
           
            {course_in_wishlist.length==1 ? 
              <button className="btn btn-outline-danger px-4" onClick={()=>dispatch(removefromwishlist(course._id))}>
              Remove from Wishlist
            </button>
            :
             <button className="btn btn-outline-success px-4" onClick={()=>handleAddtoWishlist()}>
              Add to Wishlist
            </button>
            }
         
          </div>

        </div>
      </div>

    </div>

  </div>


  {/* Curriculum Section */}
  <div className="row mt-5">

    <div className="col-lg-12">

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-light">
          <h4 className="mb-0">Course Curriculum</h4>
        </div>

        <div className="card-body">
          <p className="text-muted">
            {course.curriculum}
          </p>
        </div>

      </div>

     
    </div>

  </div>

</div>


{relatedCourse.length!=0?(
<>
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <h2>Related Products</h2>
    </div>
  </div>
</div>


<div className="container">
  <div className="row">
    <CourseItem mycourses={relatedCourse} course_image_path={courseimagepath} course_video_path={coursevideopath}/>
  </div>
</div>
</>
)
:(
  <></>
)
}

</>
  ):(
    <p>loading...</p>
  )}

  </>



  )


  
}


