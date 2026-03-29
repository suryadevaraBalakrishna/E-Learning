import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Account() {
    let [userList, setuserList] = useState([]);
    let [imagepath, setimagepath] = useState('');
    let [UpdateStatus, setUpdateStatus] = useState(false);

    let [profileDetails, setprofileDetails] = useState('');


    let usertoken = useSelector((state) => {
        return state.login.admin_token;
    })


    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_USER_VIEW, {}, {
            headers: {
                'Authorization': `Bearer ${usertoken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                setprofileDetails(result.data._data)
            } else {
                toast.error(result.data._message);
                setprofileDetails('')
            }
        })
            .catch(() => {
                toast.error('something went wrong');
            })
    }, [UpdateStatus])



    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_USER_VIEW_ALL)
            .then((result) => {
                if (result.data._status == true) {
                    setimagepath(result.data._image_path);
                    setuserList(result.data._data);
                } else {
                    setuserList([]);
                    setimagepath('');
                }
            }).catch(() => {
                toast.error(result.data._message);
            })
    }, [UpdateStatus])




    let handleUpdate = (event) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append("name", event.target.name.value);
        formData.append("email", event.target.email.value);
        formData.append("mobile_number", event.target.mobile_number.value);
        let file = event.target.image.files[0];
        if (file) {
            formData.append("image", file);
        }

        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_USER_UPDATE_PROFILE, formData, {
            headers: {
                'Authorization': `Bearer ${usertoken}`
            }
        })
            .then((result) => {
                if (result.data._status == true) {
                    toast.success(result.data._message);
                      setUpdateStatus(!UpdateStatus);
                } else {
                    toast.error(result.data._message);
                      setUpdateStatus(!UpdateStatus);
                }
            })
            .catch(() => {
                setUpdateStatus(!UpdateStatus);
                toast.error('something went wrong');
            })

    }







    return (
        <div className="container mt-5">
            <div className="row tm-content-row">
                <div className="col-12 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                        <h2 className="tm-block-title">List of Accounts</h2>
                        <div className="container mt-5">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <h4 className="mb-4">User List</h4>

                                    <div className="table-responsive">
                                        <table className="table table-bordered align-middle">

                                            <thead className="table-dark">
                                                <tr>
                                                    <th>sno</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {userList.map((user, index) => (
                                                    <tr key={user._id}>
                                                        <td>{index + 1}</td>

                                                        <td>
                                                            <img
                                                                src={imagepath + user.image}
                                                                alt="user"
                                                                width="50"
                                                                height="50"
                                                                className="rounded-circle"
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                        </td>

                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.mobile_number}</td>
                                                        <td>
                                                            <span className="badge bg-primary">
                                                                {user.role_type}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Avatar + Settings */}
            <form className="row tm-content-row g-3" onSubmit={handleUpdate} encType="multipart/form-data">

                {/* Avatar Section */}
                <div className="col-lg-4 mb-4">
                    <div className="tm-bg-primary-dark tm-block text-center">
                        <h2 className="tm-block-title">Change Avatar</h2>

                        <div className="mb-3 position-relative">

                            {profileDetails?.image ? (
                                <img
                                    src={imagepath + profileDetails.image}
                                    alt="Avatar"
                                    className="img-fluid rounded mb-3"
                                />
                            ) : (
                                <img
                                    src="http://localhost:8001/uploads/about/image-1772282623283.jpg"
                                    alt="Avatar"
                                    className="img-fluid rounded mb-3"
                                />
                            )}

                        </div>

                        <input
                            type="file"
                            className="form-control"
                            name="image"
                        />
                    </div>
                </div>


                {/* Account Settings */}
                <div className="col-lg-8">
                    <div className="tm-bg-primary-dark tm-block">
                        <h2 className="tm-block-title">Account Settings</h2>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={profileDetails?.name}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    defaultValue={profileDetails?.email}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone</label>
                                <input
                                    name="mobile_number"
                                    type="tel"
                                    defaultValue={profileDetails?.mobile_number}
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6 d-flex align-items-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Update Profile
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    )
}
