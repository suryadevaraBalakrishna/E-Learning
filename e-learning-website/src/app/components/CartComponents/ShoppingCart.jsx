'use client';
import { deleteCart, updateQuantity } from '@/app/slice/cartSlice';
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ShoppingCart() {
  let mycart = useSelector((myStore) => myStore.cartReducer.cart)

  let subtotal = mycart.reduce((total, data) => {
    return total + data.price * data.qty;
  }, 0)

  let dispatch = useDispatch();

  return (
    <div className="container py-5">

      {/* Cart Table */}
      <form autoComplete="off">

        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            {mycart.length > 0 ? (
              <>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "60px" }}>Delete</th>
                    <th style={{ width: "100px" }}>Image</th>
                    <th>Product</th>
                    <th style={{ width: "120px" }}>Price</th>
                    <th style={{ width: "140px" }}>Quantity</th>
                    <th style={{ width: "140px" }}>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {mycart.map((items, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => dispatch(deleteCart(items.id))}
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

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min="1"
                          max="100"
                          value={items.qty < 1 ? 1 : items.qty}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: items.id,
                                qty: e.target.value < 1 ? 1 : e.target.value,
                              })
                            )
                          }
                        />
                      </td>

                      <td className="fw-bold">
                        ₹ {items.price * items.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <h4>Your Cart is Empty</h4>
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


      {/* Coupon + Totals */}
      {mycart.length != 0 && (
        <div className="row mt-5 g-4">

          {/* Coupon */}
          <div className="col-lg-6">

            <div className="card shadow-sm">

              <div className="card-body">

                <h4 className="mb-3">Coupon</h4>

                <p>Enter your coupon code if you have one.</p>

                <form className="d-flex gap-2">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Coupon code"
                  />

                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Apply
                  </button>

                </form>

              </div>

            </div>

          </div>


          {/* Cart Totals */}

          <div className="col-lg-6">

            <div className="card shadow-sm">

              <div className="card-body">

                <h4 className="mb-3">Cart Totals</h4>

                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <p className="mb-0">Subtotal</p>
                  <p className="fw-bold mb-0">₹ {subtotal}</p>
                </div>

                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <p className="mb-0">Discount</p>
                  <p className="text-danger fw-bold mb-0">₹ 0</p>
                </div>

                <div className="d-flex justify-content-between pt-2 fw-bold fs-5">
                  <p className="mb-0">Total</p>
                  <p className="mb-0">₹ {subtotal}</p>
                </div>

                <div className="mt-4">

                  <Link
                    href="/checkout"
                    className="btn btn-primary w-100"
                  >
                    Proceed to Checkout
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  )
}

