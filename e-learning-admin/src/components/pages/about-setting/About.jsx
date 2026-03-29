import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


export default function About() {
     let [setting, setsetting] = useState('');
    let [imagepath, setimagepath] = useState('');
    let [update, setupdate] = useState(false);



    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_ABOUT_SETTING_VIEW)
            .then((response) => {
                if (response.data._status == true) {
                    setsetting(response.data._data);
                    setimagepath(response.data._about_setting_image_path);
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

        formData.append("sub_heading", e.target.sub_heading.value);
        formData.append("heading", e.target.heading.value);
        formData.append("description", e.target.description.value);
         formData.append("button_txt", e.target.button_txt.value);
         formData.append("button_link", e.target.button_link.value);

        formData.append("image", e.target.image.files[0]);

        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_ABOUT_SETTING_UPDATE, formData).then((response) => {
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

                     
                        <div className="mb-3">
                            <label className="form-label">Sub Heading</label>
                            <input
                                type="text"
                                name="sub_heading"
                                className="form-control"
                                defaultValue={setting?.sub_heading}
                                placeholder="Enter Site Name"
                            />
                        </div>

                
                        <div className="mb-3">
                            <label className="form-label">Heading</label>
                            <input
                                type="text"
                                name="heading"
                                className="form-control"
                                defaultValue={setting?.heading}
                                placeholder="Enter Phone Number"
                            />
                        </div>

                     
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                defaultValue={setting?.description}
                                placeholder="Enter Email Address"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Button Text</label>
                            <input
                                type="text"
                                name="button_txt"
                                className="form-control"
                                defaultValue={setting?.button_txt}
                               
                            />
                        </div>
                         <div className="mb-3">
                            <label className="form-label">Button Link</label>
                            <input
                                type="text"
                                name="button_link"
                                className="form-control"
                                defaultValue={setting?.button_link}
                               
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="mb-3">
                            <label className="form-label">image</label>
                            <input
                                type="file"
                                name="image"
                                className="form-control"
                            />

                            {/* Preview */}
                            {setting?.image && (
                                <div className="mt-3">
                                    <img
                                        src={imagepath + setting.image}
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
                                Update 
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
  )
}
