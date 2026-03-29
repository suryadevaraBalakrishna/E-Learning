import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function AddCourse() {
    const [courseCategory, setcourseCategory] = useState([]);
        const navigate=useNavigate();

    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_CATEGORY_SETTING_VIEW)
            .then((result) => {
                if (result.data._status == true) {
                    setcourseCategory(result.data._data);
                } else {
                    setcourseCategory([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const [Instructor, setInstructor] = useState([]);

    useEffect(() => {
        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_TEAM_SETTING_VIEW)
            .then((result) => {
                if (result.data._status == true) {
                    setInstructor(result.data._data);
                } else {
                    setInstructor([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])



    let handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('price', event.target.price.value);
        formData.append('description', event.target.description.value);
        formData.append('curriculum', event.target.curriculum.value);
        formData.append('categories_id', event.target.categories_id.value);
        formData.append('instructor_id', event.target.instructor_id.value);

        formData.append('image', event.target.image.files[0]);
        formData.append('video', event.target.video.files[0]);


        axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_COURSE_SETTING_CREATE, formData)
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
                                    Add Course
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
                                        <label htmlFor="description">Price</label>
                                        <input
                                            name="price"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            name="description"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Select Category</label>
                                        <select name="categories_id" className='form-control'>
                                            <option value="text" className='form-control'>Select Course Category</option>
                                            {courseCategory.map((items, index) => {
                                                return (
                                                    <option key={index} value={items._id}>{items.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Select Instructor</label>
                                        <select name="instructor_id" className='form-control'>
                                            <option value="text" className='form-control'>Select Instructor</option>
                                            {Instructor.map((items, index) => {
                                                return (
                                                    <option key={index} value={items._id}>{items.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Curriculum</label>
                                        <input
                                            name="curriculum"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>






                                    <div className="custom-file mt-3 mb-3">
                                           <h6 className='text-light'>Image</h6>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            name="image"
                                        />
                                    </div>

                                    <div className="custom-file mt-3 mb-3">
                                      <h6 className='text-light'>Video</h6>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            name="video"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block text-uppercase"
                                    >
                                        Add Course
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
