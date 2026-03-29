'use client';
import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { myStore } from '../store/store';
import { useRazorpay,RazorpayOrderOptions  } from 'react-razorpay';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart } from '../slice/cartSlice';


export default function page() {

    let mycart = useSelector((myStore) => myStore.cartReducer.cart)

    let subtotal = mycart.reduce((total, data) => {
        return total + data.price * data.qty;
    }, 0)

    let dispatch = useDispatch();

    const userToken=useSelector((myStore)=>myStore.login.token)

    const { error, isLoading, Razorpay } = useRazorpay();

    const course_info=useSelector((myStore)=>myStore.cartReducer.cart);


    let placeorder=(event)=>{
        event.preventDefault();
        axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_ORDER_PLACED,{
            course_info:course_info,
            net_amount:subtotal,
            total_amount:subtotal
        },{
            headers:{
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result)=>{
            if(result.data._status==true){
                handelePayment(result.data.orderInfo.id,result.data.orderInfo.amount)
            }else{
                toast.error('something went wrong')
            }
        })    .catch((error)=>{
        toast.error('something went wrong2');
     })
    }



    const handelePayment=(id,amount)=>{
           const options={
      key: "rzp_test_S7zG0ylca2nnea",
      amount: amount, // Amount in paise
      currency: "INR",
      name: "Elearning",
      description: "Test Transaction",
      order_id: id, // Generate order_id on server
      handler: (response) => {
        console.log(response);
        orderStatusChange(response.razorpay_payment_id,response.razorpay_order_id)
        toast.success("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);

     razorpayInstance.on("payment.failed", function (response) {
            toast.error('Payment Failed !!')
            console.log(response);
            orderStatusChange(response.error.metadata.payment_id, response.error.metadata.order_id)
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        
    razorpayInstance.open();
    }



    const orderStatusChange=(payment_id, order_id)=>{
        axios.post(process.env.NEXT_PUBLIC_BASE_URL+process.env.NEXT_PUBLIC_WEBSITE_ORDER_CHANGE_STATUS,{
            payment_id : payment_id,
            order_id : order_id
        },{
            headers:{
                'Authorization':`Bearer ${userToken}`
            }
        }).then((result)=>{
            if(result.data._status==true){
                 toast.success(result.data._messsage);
                 dispatch(clearCart())
            }else{
                    toast.error(result.data._messsage);
            }
        }).catch((error) => {
            console.log(error);
            toast.error('Something went wrong !');
        })
    }


     



    return (
        <>
            <Breadcrumb title="Checkout" parent="Home" parent_link="/" />


            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-6">

                        <div className="card shadow-sm">
                            <div className="card-body">

                                <h4 className="mb-4">Checkout</h4>
                                  <form onSubmit={placeorder}>

                                {/* Purchased Courses */}
                                {mycart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center border-bottom pb-3 mb-3"
                                    >

                                        <img
                                            src={item.image}
                                            alt="course"
                                            width="80"
                                            height="60"
                                            className="rounded me-3"
                                            style={{ objectFit: "cover" }}
                                        />

                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{item.name}</h6>
                                            <small className="text-muted">Online Course</small>
                                        </div>

                                        <div className="fw-semibold">
                                            ₹ {item.price}
                                        </div>

                                    </div>
                                ))}

                                {/* Order Summary */}
                                <div className="mt-4">

                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                        <span>Subtotal</span>
                                        <span>₹ {subtotal}</span>
                                    </div>

                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                        <span>Discount</span>
                                        <span className="text-danger">₹ 0</span>
                                    </div>

                                    <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                                        <span>Total</span>
                                        <span>₹ {subtotal}</span>
                                    </div>

                                </div>

                                {/* Place Order */}
                              
                                <button className="btn btn-primary w-100 mt-4" type='submit'>
                                    Pay ₹ {subtotal}
                                </button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
