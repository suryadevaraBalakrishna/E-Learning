'use client';
import { addtoCart, deleteCart } from '@/app/slice/cartSlice';
import { addtowishlist, removefromwishlist } from '@/app/slice/wishlistSlice';
import { myStore } from '@/app/store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function CourseItem({ mycourses, course_image_path, course_video_path }) {
    return (
        <>
            {mycourses.map((items, index) => {
                return (
                    <CourseCard items={items} index={index} key={index} course_image_path={course_image_path} course_video_path={course_video_path} />
                )
            })}
        </>
    )
}


function CourseCard({ items, index, course_image_path, course_video_path }) {

    let my_cart = useSelector((myStore) => myStore.cartReducer.cart);

    let my_wish = useSelector((myStore) => myStore.wishlist.coursewishlist);




    let dispatch = useDispatch();


    let course_in_cart = my_cart.filter((course) => course.id == items._id);
    let course_in_wishlist = my_wish.filter((course) => course.id == items._id);



    let handleAddtocart = () => {
        let obj = {
            qty: 1,
            name: items.name,
            price: items.price,
            image: course_image_path + items.image,
            video: course_video_path + items.video,
            id: items._id
        }
        dispatch(addtoCart(obj));
    }



    let handleAddtowishlist = () => {
        let obj = {
            qty: 1,
            name: items.name,
            price: items.price,
            image: course_image_path + items.image,
            video: course_video_path + items.video,
            id: items._id
        }
        dispatch(addtowishlist(obj));
    }



    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp mb-4" data-wow-delay="0.1s" key={index} >
            <div className="course-item ">
                <div className="position-relative overflow-hidden">
                    <img className="img-fluid" src={course_image_path + items.image} alt="" />
                </div>
                <div className="text-center p-2 pb-2">
                    <h5 className="mb-2"><a href={`/course/${items.slug}`} className='text-decoration-none text-dark'>{items.name}</a></h5>
                    <p className="mb-2">{items.description?.substring(0, 60)}...</p>
                    <h5 className="mb-2">Rs {items.price}</h5>
                </div>
                <div className="w-100 d-flex justify-content-center gap-2 pb-4">
                    {course_in_cart.length == 1
                        ?
                        <button onClick={() => dispatch(deleteCart(items._id))} className="flex-shrink-0 btn btn-sm btn-danger px-3 border-end" >Delete from cart</button>
                        :
                        <button onClick={() => handleAddtocart()} className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" >Add to cart</button>
                    }

                    {course_in_wishlist.length == 1
                        ?
                        <button onClick={() => dispatch(removefromwishlist(items._id))} className="flex-shrink-0 btn btn-sm btn-danger px-3">Delete from wishlist</button>
                        :
                        <button onClick={() => handleAddtowishlist()} className="flex-shrink-0 btn btn-sm btn-success px-3">Add to wishlist</button>
                    }


                </div>
            </div>
        </div>

    )
}
