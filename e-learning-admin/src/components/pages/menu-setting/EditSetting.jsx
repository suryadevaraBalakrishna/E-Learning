import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function EditSetting() {
const params=useParams();
const id=params.id;
const [menuData, setMenuData] = useState('');
const [parentMenus, setParentMenus] = useState([]);


const navigate = useNavigate();

useEffect(()=>{
    if(id){
       axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_VIEW, {id:id})
       .then((result)=>{
        if(result.data._status==true){
            setMenuData(result.data._data); 
            console.log(result.data._data);
        }else{
            toast.error(result.data._message);
        }
       })
       .catch(()=>{
        toast.error("Something went wrong");
       })
    }
},[])


useEffect(()=>{
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_VIEW)
    .then((result)=>{   
        if(result.data._status==true){
            const filterMenu=result.data._data.filter((menu)=>{
                return menu._id !== id;
            })
            setParentMenus(filterMenu);
        }else{
            setParentMenus([]);
            toast.error(result.data._message);
        }   
    })
    .catch(()=>{
        toast.error("Something went wrong");
    })  
},[])


let formsubmit=(e)=>{
    e.preventDefault();
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_UPDATE+ '/' + id, {
        name:e.target.name.value,
        slug:e.target.slug.value,
        link:e.target.link.value,
        parentId:e.target.parentId.value,
        order:e.target.order.value
    })
    .then((result)=>{
        if(result.data._status==true){
            toast.success(result.data._message);
            navigate('/menu-setting');
        }else{
            toast.error(result.data._message);
        }   
    })
    .catch(()=>{
        toast.error("Something went wrong");
    })
}




 
 
    return (
        <div class="container mt-4">

            <div class="d-flex justify-content-between align-items-center mb-3 text-light">
                <h4>Edit Menu</h4>
                
            </div>

            <div class="row">

                <div class="col-md-6 offset-md-3">
                    <div class="card shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h6 class="mb-0">Edit Menu</h6>
                        </div>

                        <div class="card-body">
                            <form onSubmit={formsubmit} method="post">


                                <div class="mb-3">
                                    <label class="form-label">Menu Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        defaultValue={menuData ? menuData.name : ''}
                                        placeholder="Enter menu name"
                                    />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        class="form-control"
                                        defaultValue={menuData ? menuData.slug : ''}
                                        placeholder="enter-slug"
                                    />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Link</label>
                                    <input
                                        type="text"
                                        name="link"
                                        class="form-control"
                                        defaultValue={menuData ? menuData.link : ''}
                                        placeholder="/about"
                                    />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Parent Menu</label>
                                    <select name="parentId" class="form-select">
                                        <option value="">-- Main Menu --</option>
                                        {parentMenus.map((menu)=>{
                                            return <option value={menu._id} key={menu._id} selected={menuData && menuData.parentId === menu._id}>{menu.name}</option>
                                        })}
                                     
                                    </select>
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        class="form-control"
                                        defaultValue={menuData ? menuData.order : 1}
                                        placeholder="0"
                                    />
                                </div>


                               


                                <div class="text-end">
                                    <button type="submit" class="btn btn-success me-2">
                                        <i class="fas fa-save me-2"></i>
                                        Update Menu
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
