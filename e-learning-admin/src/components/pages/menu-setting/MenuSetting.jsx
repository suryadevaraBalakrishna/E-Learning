import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function MenuSetting() {
  const [Menus, setMenus] = useState([]);
  const [createStatus, setCreateStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);


  useEffect(()=>{
   axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_VIEW)
   .then((response)=>{
    if(response.data._status == true){
      setMenus(response.data._data);
    }else{
      setMenus([]);
      toast.error(response.data._message);
    }
   }).catch((error)=>{
    toast.error(error._message);
   })
  },[createStatus,deleteStatus])




  
  let handlesubmit=((e)=>{
    e.preventDefault();
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_CREATE, {
      name: e.target.name.value,
      slug: e.target.slug.value,
      link: e.target.link.value,
      parentId: e.target.parentId.value,
      order: e.target.order.value,
      status: e.target.status.value
    }).then((response)=>{
      if(response.data._status == true){
        toast.success(response.data._message);
        e.target.reset();
        setCreateStatus(!createStatus);
      }else{
        toast.error(response.data._message);
      }
  }).catch((error)=>{
    toast.error(error._message);
  })
  })




let handledelete=((id)=>{
  if(window.confirm("Are you sure to delete?")){
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_MENU_SETTING_DELETE, {
      id:id
    }).then((response)=>{
      if(response.data._status == true){
        toast.success(response.data._message);
        setDeleteStatus(!deleteStatus);
      }else{
        toast.error(response.data._message);
      } 
    }).catch((error)=>{
      toast.error(error._message);
    })
  }
})




  return (
    <div className="container mt-4">

      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Menu Management</h4>
      </div>

      <div className="row">

        {/* LEFT SIDE - CREATE MENU FORM */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Add / Edit Menu</h6>
            </div>

            <div className="card-body">
              <form onSubmit={handlesubmit}>

                {/* Menu Name */}
                <div className="mb-3">
                  <label className="form-label">Menu Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter menu name"
                  />
                </div>

                {/* Slug */}
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    className="form-control"
                    placeholder="enter-slug"
                  />
                </div>

                {/* Link */}
                <div className="mb-3">
                  <label className="form-label">Link</label>
                  <input
                    type="text"
                    name="link"
                    className="form-control"
                    placeholder="/about"
                  />
                </div>

                {/* Parent Menu */}
                <div className="mb-3">
                  <label className="form-label">Parent Menu</label>
                  <select name="parentId" className="form-select">
                    <option value="">-- Main Menu --</option>
                    {/* You will map parent menus here */}
                    {Menus.map((menu)=>{
                      return <option key={menu._id} value={menu._id}>{menu.name}</option>
                    })}
                  </select>
                </div>

                {/* Order */}
                <div className="mb-3">
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    name="order"
                    className="form-control"
                    placeholder="0"
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select name="status" className="form-select">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="text-end">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-save me-2"></i>
                    Save Menu
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - MENU LIST TABLE */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h6 className="mb-0">Menu List</h6>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sno.</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Parent</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th width="120">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Menus.length > 0 ? Menus.map((menu, index) => (
                      <tr key={menu.id}>
                        <td>{index + 1}</td>
                        <td>{menu.name}</td>
                        <td>{menu.slug}</td>
                        <td>{menu.parentName || 'Main'}</td>
                      <td>{menu.order}</td>
                      <td>
                        <span className={`badge ${menu.status ? 'bg-success' : 'bg-danger'}`}>
                          {menu.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                         <a href={`/menu-setting/edit/${menu._id}`} className="text-white">
                           <i className="fas fa-edit"></i>
                         </a>
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={()=>handledelete(menu._id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>

                    )):(
                      <tr>
                        <td colSpan="7" className="text-center">No menus found.</td>
                      </tr>
                    )}

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
