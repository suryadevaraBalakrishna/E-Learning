import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';

export default function EditTeam() {
       const params = useParams();
    const id = params.id;
    const [imagepath, setimagepath] = useState('');
    let [serviceData, setserviceData] = useState('');

    const navigate=useNavigate();

    useEffect(() => {
        if (id) {
            axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_TEAM_SETTING_DETAILS, { id: id })
                .then((result) => {
                    if (result.data._status == true) {
                        setserviceData(result.data._data);
                        setimagepath(result.data._team_image_path);
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
    formData.append('designation', event.target.designation.value);
    formData.append('image', event.target.image.files[0]);

      axios.post(import.meta.env.VITE_API_ADMIN_URL+ import.meta.env.VITE_API_TEAM_SETTING_UPDATE + '/' + id,formData)
      .then((result)=>{
        if(result.data._status==true){
           toast.success('updated')
           navigate('/add-team');
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
                            <h6 className="mb-0">Edit Team</h6>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleUpdate}  encType="multipart/form-data">

                           
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" placeholder="Enter heading"   defaultValue={serviceData.name} name='name'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter description" defaultValue={serviceData.designation}  name='designation'></textarea>
                                </div>

                           

                                <div className="mb-3">
                                    <label className="form-label">Slider Image</label>
                                    <input type="file" className="form-control" name='image' />
                                    <img src={imagepath+serviceData.image} className='img-fluid'/>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Update Team
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
