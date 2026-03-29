import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function NewsletterSetting() {
  let [newsetting, setnewsetting] = useState([]);
  let [update, setupdate] = useState(false);

  useEffect(()=>{
    axios.post(import.meta.env.VITE_API_ADMIN_URL + import.meta.env.VITE_API_NEWSLETTER_SETTING_VIEW).then((response)=>{
      if(response.data._status == true){
        setnewsetting(response.data._data);
        console.log(response.data._data);
      }else{
        setnewsetting('');
        toast.error(response.data._message)
      }
    }).catch((error)=>{
      toast.error(error._message);
    })
  })


  return (
    <div className="container mt-4">

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Newsletter Subscribers</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th width="80">S.No</th>
                  <th>Email</th>
                  <th>Created Date</th>
                </tr>
              </thead>

              <tbody>
                {newsetting.length > 0 ? (
                  newsetting.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No newsletter records found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>

    </div>
  )

}

