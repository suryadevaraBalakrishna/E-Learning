import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';

export default function EditSlider() {
    const params = useParams();
    const id = params.id;
    const [imagepath, setimagepath] = useState('');
    let [sliderData, setsliderData] = useState('');

    const navigate=useNavigate();

    useEffect(() => {
        if (id) {
            axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_SLIDER_SETTING_DETAILS, { id: id })
                .then((result) => {
                    if (result.data._status == true) {
                        setsliderData(result.data._data);
                        setimagepath(result.data._slider_image_path);
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

     formData.append('subheading',event.target.subheading.value);
     formData.append('heading',event.target.heading.value);
     formData.append('description',event.target.description.value);
      formData.append('button_txt',event.target.button_txt.value);
     formData.append('button_link',event.target.button_link.value);
     formData.append('button_txt_two',event.target.button_txt_two.value);
      formData.append('button_link_two',event.target.button_link_two.value);
       formData.append('image',event.target.image.files[0]);


      axios.post(import.meta.env.VITE_API_ADMIN_URL+ import.meta.env.VITE_API_SLIDER_SETTING_UPDATE + '/' + id,formData)
      .then((result)=>{
        if(result.data._status==true){
           toast.success('updated')
           navigate('/add-slider');
         }else{
             toast.error(result.data._message);
        }
      })
      .catch(()=>{
         toast.error(result.data._message);
      })
      
    }




    return (

        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h6 className="mb-0">Edit Slider</h6>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleUpdate}  encType="multipart/form-data">

                                <div className="mb-3">
                                    <label className="form-label">Sub Heading</label>
                                    <input type="text" className="form-control" placeholder="Enter sub heading" defaultValue={sliderData.subheading} name='subheading' />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Heading</label>
                                    <input type="text" className="form-control" placeholder="Enter heading"   defaultValue={sliderData.heading} name='heading'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter description" defaultValue={sliderData.description}  name='description'></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Button Text</label>
                                    <input type="text" className="form-control" placeholder="Enter button text" defaultValue={sliderData.button_txt} name='button_txt'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Button Link</label>
                                    <input type="text" className="form-control" placeholder="Enter button link" defaultValue={sliderData.button_link} name='button_link' />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Button Text Two</label>
                                    <input type="text" className="form-control" placeholder="Enter button text" defaultValue={sliderData.button_txt_two} name='button_txt_two' />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Button Link Two</label>
                                    <input type="text" className="form-control" placeholder="Enter button link" defaultValue={sliderData.button_link_two} name='button_link_two'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Slider Image</label>
                                    <input type="file" className="form-control" name='image' />
                                    <img src={imagepath+sliderData.image} className='img-fluid'/>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Update Slider
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}
