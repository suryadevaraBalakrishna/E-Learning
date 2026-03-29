import axios from 'axios';
import { Toast } from 'bootstrap';
import React, { useEffect } from 'react'

export default function Orders() {
    let [orders,setOrders]=React.useState([]);

    useEffect(()=>{
        axios.post(import.meta.env.VITE_API_ADMIN_URL+import.meta.env.VITE_API_ORDER_SETTING_VIEW)
        .then((result)=>{
         if(result.data._status==true){
             setOrders(result.data._data);
             console.log(result.data._data);
         }else{
            console.log(result.data._message);
         }
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
return (
    <div className="container-fluid mt-5 px-4">
        <div className="row tm-content-row">
            <div className="col-12 tm-block-col">
                <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <h2 className="tm-block-title mb-4">Orders Management</h2>
                    
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-gradient p-4">
                            <h5 className="mb-0 fs-4">Order List ({orders.length})</h5>
                        </div>
                        
                        <div className="card-body p-4">
                            {orders.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0 table-sm">
                                        <thead className="table-dark">
                                            <tr>
                                                <th className="text-center">Sno</th>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Date</th>
                                                <th className="text-end">Amount</th>
                                                <th>Course Details</th>
                                                <th className="text-center">Status</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={order._id} className="border-bottom">
                                                    <td className="text-center fw-bold">{index + 1}</td>
                                                    <td>
                                                        <span className="badge bg-info text-dark">{order._id}</span>
                                                    </td>
                                                    <td className="fw-500">{order.user_id?.name || "N/A"}</td>
                                                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                                    <td className="text-end fw-bold">Rs {order.total_amount}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            {order.course_info?.[0]?.image && (
                                                                <img 
                                                                    src={order.course_info[0].image} 
                                                                    alt="Course" 
                                                                    className="img-thumbnail"
                                                                    style={{width: '80px', height: '80px', objectFit: 'cover', flexShrink: 0}}
                                                                />
                                                            )}
                                                            <div style={{minWidth: '0', flex: 1}}>
                                                                {order.course_info?.map((item, idx) => (
                                                                    <div key={idx} className="small mb-1">
                                                                        <span className="badge bg-secondary" style={{wordBreak: 'break-word'}}>{item.name} (x{item.qty})</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span
                                                            className={`badge ${
                                                                order.order_status === 1
                                                                    ? "bg-warning text-dark"
                                                                    : order.order_status === 2
                                                                    ? "bg-success"
                                                                    : order.order_status === 3
                                                                    ? "bg-danger"
                                                                    : "bg-secondary"
                                                            }`}
                                                        >
                                                            {order.order_status === 1
                                                                ? "In Process"
                                                                : order.order_status === 2
                                                                ? "Order Placed"
                                                                : order.order_status === 3
                                                                ? "Failed"
                                                                : "Unknown"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted">No orders found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
