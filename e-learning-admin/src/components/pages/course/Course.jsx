import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Course() {
  const [courseCategory, setcourseCategory] = useState([]);
  const [deleteStatus, setdeleteStatus] = useState(false);


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_CATEGORY_SETTING_VIEW)
      .then((result) => {
        if (result.data._status == true) {
          setcourseCategory(result.data._data);
        } else {
          setcourseCategory([]);
          toast.error(result.data._message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [deleteStatus])


  let handleDelete = ((id) => {
    if (window.confirm("Are you sure to delete?")) {
      axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_CATEGORY_SETTING_DELETE, {
        id: id
      }).then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
          setdeleteStatus(!deleteStatus);
        } else {
          toast.error(response.data._message);
        }
      }).catch((error) => {
        toast.error(error._message);
      })

    }
  })



  //course

  const [course, setcourse] = useState([]);
  const [imagePath, setimagePath] = useState('');
  const [coursedeletestaus, setcoursedeletestaus] = useState(false);

  useEffect(() => {
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_COURSE_SETTING_VIEW,{
      limit:20
    })
      .then((result) => {
        if (result.data._status == true) {
          setcourse(result.data._data);
          setimagePath(result.data._course_image_path);
        } else {
          setcourse([])
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [coursedeletestaus])


  let handleCourseDelete = ((id) => {
    if (window.confirm("Are you sure to delete?")) {
      axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_COURSE_SETTING_DELETE, {
        id: id
      }).then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
          setcoursedeletestaus(!coursedeletestaus);
        } else {
          toast.error(response.data._message);
        }
      }).catch((error) => {
        toast.error(error._message);
      })

    }
  })





  return (
    <div className="container mt-5">
      <div className="row tm-content-row">

        {/* Products Table */}
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products">

            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  {course.map((items, index) => (
                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td className="tm-product-name">
                         <a href={`/edit-course/${items._id}`} className='text-dark text-decoration-none'>
                          {items.name}
                        </a>
                      </td>
                      <td>{items.price}</td>
                      <td><img src={imagePath + items.image} className='img-fluid w-50' /></td>
                      <td>
                        <button className="tm-product-delete-link" onClick={() => handleCourseDelete(items._id)}>
                          <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a
              href="/add-course"
              className="btn btn-primary btn-block text-uppercase mx-3"
            >
              Add new course
            </a>

        

          </div>
        </div>

        {/* Categories Table */}
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
            <h2 className="tm-block-title">Course Categories</h2>

            <div className="tm-product-table-container">
              <table className="table tm-table-small tm-product-table">
                <tbody>
                  {courseCategory.map((items, index) => (
                    <tr key={index}>
                      <td className="tm-product-name">
                        <a href={`/edit-category/${items._id}`} className='text-dark text-decoration-none'>
                          {items.name}
                        </a>
                      </td>

                      <td className="text-center">
                        <button className="tm-product-delete-link" onClick={() => handleDelete(items._id)}>
                          <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <a
              href="/add-category"
              className="btn btn-primary btn-block text-uppercase mx-3"

            >
              Add new category
            </a>



          </div>
        </div>

      </div>
    </div>
  )
}
