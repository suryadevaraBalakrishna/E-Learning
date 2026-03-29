import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddSlider() {
  const [slider, setslider] = useState('');
  const [imagepath, setimagepath] = useState('');
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [createStatus, setcreateStatus] = useState(false);


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_SLIDER_SETTING_VIEW)
      .then((result) => {
        if (result.data._status == true) {
          setslider(result.data._data);
          setimagepath(result.data._slider_image_path);
        } else {
          toast.error(response.data._message);
        }
      }).catch((error) => {
        toast.error(error._message);
      })
  }, [deleteStatus,createStatus])



  let handleDelete = ((id) => {
    if (window.confirm("Are you sure to delete?")) {
      axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_SLIDER_SETTING_DELETE, {
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


  let handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('subheading', event.target.subheading.value);
    formData.append('heading', event.target.heading.value);
    formData.append('description', event.target.description.value);
    formData.append('button_txt', event.target.button_txt.value);
    formData.append('button_link', event.target.button_link.value);
    formData.append('button_txt_two', event.target.button_txt_two.value);
    formData.append('button_link_two', event.target.button_link_two.value);
    formData.append('image', event.target.image.files[0]);

    axios.post(import.meta.env.VITE_API_ADMIN_URL+import.meta.env.VITE_API_SLIDER_SETTING_CREATE,formData)
    .then((result)=>{
      if(result.data._status==true){
        toast.success(result.data._message);
        setcreateStatus(!createStatus);
        event.target.reset();
      }else{
        toast.error(result.data._message);
      }
    })
    .catch(()=>{
      toast.error(result.data._message)
    })
  }






  return (
    <div className="container mt-4">

      <div className="row">

        {/* Left Side - Add Slider Form */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Add Slider</h6>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit} encType='multipart/form-data'>

                <div className="mb-3">
                  <label className="form-label">Sub Heading</label>
                  <input type="text" className="form-control" placeholder="Enter sub heading" name='subheading' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Heading</label>
                  <input type="text" className="form-control" placeholder="Enter heading" name='heading' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Enter description" name='description'></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Button Text</label>
                  <input type="text" className="form-control" placeholder="Enter button text" name='button_txt' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Button Link</label>
                  <input type="text" className="form-control" placeholder="Enter button link" name='button_link' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Button Text Two</label>
                  <input type="text" className="form-control" placeholder="Enter button text" name='button_txt_two' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Button Link Two</label>
                  <input type="text" className="form-control" placeholder="Enter button link" name='button_link_two' />
                </div>

                <div className="mb-3">
                  <label className="form-label">Slider Image</label>
                  <input type="file" className="form-control" name='image' />
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    Save Slider
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>


        {/* Right Side - Slider Table */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h6 className="mb-0">Slider List</h6>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th width="60">S.No</th>
                      <th width="120">Image</th>
                      <th>Heading</th>
                      <th>Button</th>
                      <th width="120">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {/* Sample Row */}
                    {slider.length != 0 ? (
                      slider.map((items, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={imagepath + items.image}
                              alt="slider"
                              width="100"
                              height="60"
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>{items.subheading}</td>
                          <td>{items.heading}</td>
                          <td>
                            <button className="btn btn-sm btn-warning me-1" >
                              <a href={`/slider/edit/${items._id}`} className="text-white">
                                <i className="fas fa-edit"></i>
                              </a>
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(items._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )
                      )
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No sliders available.
                        </td>
                      </tr>
                    )
                    }


                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
