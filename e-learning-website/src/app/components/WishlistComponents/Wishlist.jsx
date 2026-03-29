'use client'
import { addtoCart } from '@/app/slice/cartSlice';
import { removefromwishlist } from '@/app/slice/wishlistSlice';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Wishlist() {
  let mywish = useSelector((myStore)=>myStore.wishlist.coursewishlist);
  

  let dispatch = useDispatch();

  let handleAddtocart=(items)=>{
      dispatch(addtoCart(items));
      dispatch(removefromwishlist(items.id))
  }

  return (
    <div className="container py-5">

      {/* Cart Table */}
      <form autoComplete="off">

        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            {mywish.length > 0 ? (
              <>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "60px" }}>Delete</th>
                    <th style={{ width: "100px" }}>Image</th>
                    <th>Product</th>
                    <th style={{ width: "120px" }}>Price</th>
                    <th style={{ width: "140px" }}>Add to cart</th>
                  </tr>
                </thead>

                <tbody>
                  {mywish.map((items, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => dispatch(removefromwishlist(items.id))}
                        >
                          ×
                        </button>
                      </td>

                      <td>
                        <img
                          src={items.image}
                          alt="product"
                          className="img-fluid rounded"
                          style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                      </td>

                      <td>{items.name}</td>

                      <td>₹ {items.price}</td>
                       
                       <td> <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleAddtocart(items)}
                        >
                          Add to cart
                        </button></td>
                     
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <h4>Your wishlist is Empty</h4>
                    <p>Add courses to continue learning</p>

                    <Link href="/course" className="btn btn-primary mt-2">
                      Browse Courses
                    </Link>
                  </td>
                </tr>
              </tbody>
            )}

          </table>

        </div>

        {/* <div className="text-end mt-3">
          <button className="btn btn-primary">
            Update Cart
          </button>
        </div> */}

      </form>


    
    </div>
  )
}
