import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


export default function AddCategory() {
    
    const navigate=useNavigate();


    let handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('order', event.target.order.value);
        formData.append('image', event.target.image.files[0]);


        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_CATEGORY_SETTING_CREATE, formData)
            .then((result) => {
                if (result.data._status == true) {
                    toast.success(result.data._message);
                    navigate('/course');
                    event.target.reset();
                } else {
                    toast.error(result.data._message);
                }
            })
            .catch(() => {
                toast.error(result.data._message)
            })
    }

    return (
        <div className="container tm-mt-big tm-mb-big">
            <div className="row">
                <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                    <div className="tm-bg-primary-dark tm-block tm-block-h-auto">

                        <div className="row">
                            <div className="col-12">
                                <h2 className="tm-block-title d-inline-block">
                                    Add Category
                                </h2>
                            </div>
                        </div>

                        <div className="row tm-edit-product-row">

                            {/* Left Side Form */}
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <form className="tm-edit-product-form" onSubmit={handleSubmit}>

                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Order</label>
                                        <input
                                            name="order"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>



                                    <div className="custom-file mt-3 mb-3">
                                        <input
                                            id="fileInput"
                                            type="file"
                                            name="image"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block text-uppercase"
                                    >
                                        Add Category
                                    </button>

                                </form>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
