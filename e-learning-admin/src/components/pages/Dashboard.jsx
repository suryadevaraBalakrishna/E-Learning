import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function dashboard() {
  let [dashboardData, setDashboardData] = useState({})

  useEffect(()=>{
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_DASHBOARD_SETTING_VIEW)
    .then((result)=>{
      if(result.data._status==true){
        setDashboardData(result.data._data);
      }else{
        setDashboardData({})
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])


  return (
    <div className="container my-5 min-h-fit-screen">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div className="card-body text-white">
              <h5 className="card-title">Courses</h5>
              <p className="card-text display-4 fw-bold">{dashboardData?.courses || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            <div className="card-body text-white">
              <h5 className="card-title">Orders</h5>
              <p className="card-text display-4 fw-bold">{dashboardData?.orders || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <div className="card-body text-white">
              <h5 className="card-title">Users</h5>
              <p className="card-text display-4 fw-bold">{dashboardData?.users || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
