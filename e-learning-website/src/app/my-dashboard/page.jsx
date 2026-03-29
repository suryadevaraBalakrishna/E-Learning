'use client';
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slice/loginSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function page() {
    let [tab, settab] = useState('my-dashboard');
    let [imagePath,setimagePath]=useState('');
    let [order, setorder] = useState([]);
 
    const router = useRouter();

    let dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut())
        router.push('/');
    }

    const userToken = useSelector((state) => {
        return state.login.token
    })

    let [profileDetails, setprofileDetails] = useState('');
    let [status,setstatus]=useState(false);


    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_VIEW, {}, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                setprofileDetails(result.data._data);
                setimagePath(result.data._image_path);
            } else {
                toast.error(result.data._message);
                setimagePath('');
            }
        })
            .catch(() => {
                toast.error('something error');
            })


    }, [status])


     useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_ORDER_MY_ORDER, {}, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                setorder(result.data._data);
            } else {
                toast.error(result.data._message);
             
            }
        })
            .catch(() => {
                toast.error('something error');
            })


    }, [])







    let handleUpdate=(event)=>{
      event.preventDefault();
       let formData=new FormData();

     formData.append('name',event.target.name.value);
     formData.append('mobile_number',event.target.mobile_number.value);
     let file = event.target.image.files[0];
      if (file) {
            formData.append("image", file);
      }

       axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_UPDATE_PROFILE, formData, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
          setstatus(!status);
        } else {
          toast.error(result.data._message);
            setstatus(!status);
        }
      })
      .catch(() => {
        toast.error('something error');
          setstatus(!status);
      })
    }



    let updatePassword = (event) => {
    event.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_CHANGE_PASSWORD,
      event.target, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
        } else {
          toast.error(result.data._message)
        }
      })
      .catch(() => {
        toast.error('something error');
      })

  }
    return (
        <>
            <Breadcrumb title="My Dashboard" parent="Home" parent_link="/" />
            <div className="container py-5">

                <div className="mb-4">
                    <h2 className="fw-bold">Welcome to your Dashboard</h2>
                </div>

                <div className="row">

                    {/* LEFT SIDEBAR */}
                    <div className="col-lg-3 mb-4">
                        <div className="list-group">

                            <button onClick={() => settab('my-dashboard')} className="list-group-item list-group-item-action active">
                                My Dashboard
                            </button>

                            <button onClick={() => settab('orders')} className="list-group-item list-group-item-action">
                                Orders
                            </button>

                            <button onClick={() => settab('my-profile')} className="list-group-item list-group-item-action">
                                My Profile
                            </button>

                            <button onClick={() => settab('change-password')} className="list-group-item list-group-item-action">
                                Change Password
                            </button>

                            <button className="list-group-item list-group-item-action text-danger" onClick={logout}>
                                Logout
                            </button>

                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="col-lg-9">

                        <div className="card shadow-sm">
                            <div className="card-body">

                                {/* DASHBOARD */}
                                {tab === 'my-dashboard' && (
                                    <div className="mb-5">
                                        <h4 className="fw-bold mb-3">My Dashboard</h4>
                                        <p className="text-muted">
                                            Welcome to your dashboard.
                                        </p>
                                    </div>
                                )}



                                {/* ORDERS */}
                                {tab === 'orders' && (
                                    <div className="mb-5">
                                        <h4 className="fw-bold mb-3">Orders</h4>

                                        {order?.map((order, index) => {
  return (
    <div className="card mb-4 shadow-sm border-0" key={order._id}>
      <div className="card-body">

        {/* 🔹 Order Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <p className="mb-1 fw-semibold">
              Order No:
              <span className="text-primary ms-1">{order.order_number || order._id}</span>
            </p>
            <small className="text-muted">
              {new Date(order.order_date).toLocaleDateString()}
            </small>
          </div>

          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-pill text-white fw-medium ${
              order.order_status === 1
                ? "bg-primary"
                : order.order_status === 2
                ? "bg-success"
                : order.order_status === 3
                ? "bg-danger"
                : "bg-dark"
            }`}
          >
            {order.order_status === 1
              ? "In Process"
              : order.order_status === 2
              ? "Order Placed"
              : order.order_status === 3
              ? "Order Failed"
              : "-"}
          </span>
        </div>

        {/* 🔹 Products */}
       {order.course_info?.map((course, i) => (
  <div
    key={i}
    className="border rounded p-3 mb-3 d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3"
  >

    {/* Image */}
    <img
      src={course.image}
      alt={course.name}
      width="80"
      height="80"
      className="rounded"
    />

    {/* Details */}
    <div className="flex-grow-1">
      <p className="mb-1 fw-semibold">{course.name}</p>
      <small className="text-muted">Qty: {course.qty}</small>
    </div>

    {/* Video Button */}
    <a
      href={course.video}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-primary btn-sm"
    >
      ▶ View Video
    </a>

    {/* Price */}
    <div className="fw-bold text-success">
      ₹{course.price}
    </div>

  </div>
))}

        {/* 🔹 Total */}
        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
          <span className="text-muted">Total Amount</span>
          <span className="fw-bold fs-5 text-success">
            ₹{order.total_amount}
          </span>
        </div>

      </div>
    </div>
  );
})}
                                     

                                        

                                    </div>
                                )}



                                {/* PROFILE */}
                                {tab === 'my-profile' && (
                                    <div className="mb-5">
                                        <h4 className="fw-bold mb-3">My Profile</h4>

                                        <form style={{ maxWidth: "500px" }} onSubmit={handleUpdate}>

                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={profileDetails.name}
                                                    placeholder="Enter your name"
                                                    name='name'
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <p className="form-control-plaintext"> {profileDetails.email}</p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter phone number"
                                                    name='mobile_number'
                                                     defaultValue={profileDetails.mobile_number}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Image</label>
                                                <div>
                                                    <img src={imagePath+profileDetails.image} className='img-fluid' />
                                                </div>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="Enter phone number"
                                                     name='image'
                                                />
                                            </div>

                                            <button className="btn btn-primary" type='submit'>
                                                Update Profile
                                            </button>

                                        </form>
                                    </div>
                                )}



                                {/* CHANGE PASSWORD */}
                                {tab === 'change-password' && (
                                    <div>
                                        <h4 className="fw-bold mb-3">Change Password</h4>

                                        <form style={{ maxWidth: "500px" }} onSubmit={updatePassword}>

                                            <div className="mb-3">
                                                <label className="form-label">Current Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name='current_password'
                                                    placeholder="Current Password"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name='new_password'
                                                    placeholder="New Password"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name='confirm_password'
                                                    placeholder="Confirm Password"
                                                />
                                            </div>

                                            <button className="btn btn-danger" type='submit'>
                                                Update Password
                                            </button>

                                        </form>

                                    </div>

                                )}

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
