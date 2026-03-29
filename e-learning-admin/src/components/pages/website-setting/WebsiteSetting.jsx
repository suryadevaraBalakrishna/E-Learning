import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function WebsiteSetting() {
    let [setting, setsetting] = useState('');
    let [imagepath, setimagepath] = useState('');
    let [update, setupdate] = useState(false);



    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_WEBSITE_SETTING_VIEW)
            .then((response) => {
                if (response.data._status == true) {
                    setsetting(response.data._data);
                    setimagepath(response.data._setting_image_path);
                } else {
                    setsetting('');
                    toast.error(response.data._message)
                }
            }).catch((error) => {
                toast.error(error._message);
            })
    }, [update])


    let handlesubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("sitename", e.target.sitename.value);
        formData.append("phone", e.target.phone.value);
        formData.append("email", e.target.email.value);

        formData.append("logo", e.target.logo.files[0]);

        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_WEBSITE_SETTING_UPDATE, formData).then((response) => {
            if (response.data._status == true) {
                toast.success(response.data._message);
                setupdate(!update);
                e.target.reset();
            } else {
                toast.error(response.data._message)
            }
        }).catch((error) => {
            toast.error(error._message);
        })
    }



    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Website Settings</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handlesubmit} encType="multipart/form-data">

                        {/* Site Name */}
                        <div className="mb-3">
                            <label className="form-label">Site Name</label>
                            <input
                                type="text"
                                name="sitename"
                                className="form-control"
                                defaultValue={setting?.sitename}
                                placeholder="Enter Site Name"
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                defaultValue={setting?.phone}
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                defaultValue={setting?.email}
                                placeholder="Enter Email Address"
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="mb-3">
                            <label className="form-label">Logo</label>
                            <input
                                type="file"
                                name="logo"
                                className="form-control"
                            />

                            {/* Preview */}
                            {setting?.logo && (
                                <div className="mt-3">
                                    <img
                                        src={imagepath + setting.logo}
                                        alt="Logo"
                                        style={{ height: "80px" }}
                                        className="img-thumbnail"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="text-end">
                            <button type="submit" className="btn btn-success">
                                <i className="fas fa-save me-2"></i>
                                Update Settings
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )

}
