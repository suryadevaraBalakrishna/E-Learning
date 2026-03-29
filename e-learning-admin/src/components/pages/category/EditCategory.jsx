import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';

export default function EditCategory() {
     const params = useParams();
    const id = params.id;
    const [imagepath, setimagepath] = useState('');
    let [categoryData, setcategoryData] = useState('');

     const navigate=useNavigate();

    useEffect(() => {
        if (id) {
            axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_CATEGORY_SETTING_DETAILS, { id: id })
                .then((result) => {
                    if (result.data._status == true) {
                        setcategoryData(result.data._data);
                        setimagepath(result.data._categories_image_path);
                    } else {
                        toast.error(result.data._message);
                    }
                })
                .catch(() => {
                    toast.error('something went wrong');
                })
        }
    })

   
    let handleUpdate=(event)=>{
     event.preventDefault();
     let formData=new FormData();
      formData.append('name', event.target.name.value);
    formData.append('order', event.target.order.value);
    formData.append('image', event.target.image.files[0]);

      axios.post(import.meta.env.VITE_API_ADMIN_URL+ import.meta.env.VITE_API_CATEGORY_SETTING_UPDATE + '/' + id,formData)
      .then((result)=>{
        if(result.data._status==true){
           toast.success('updated')
           navigate('/course');
         }else{
             toast.error(result.data._message);
        }
      })
      .catch(()=>{
         toast.error(result.data._message);
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
                                    Edit Category
                                </h2>
                            </div>
                        </div>

                        <div className="row tm-edit-product-row">

                            {/* Left Side Form */}
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <form className="tm-edit-product-form" onSubmit={handleUpdate}>

                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            required
                                            defaultValue={categoryData.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Order</label>
                                        <input
                                            name="order"
                                            type="text"
                                            className="form-control"
                                              defaultValue={categoryData.order}
                                        />
                                    </div>



                                    <div className="custom-file mt-3 mb-3">
                                        <input
                                            id="fileInput"
                                            type="file"
                                            name="image"
                                        />
                                         <img src={imagepath+categoryData.image} className='img-fluid'/>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block text-uppercase"
                                    >
                                        Update Category
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
