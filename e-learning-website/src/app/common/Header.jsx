'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myStore } from '../store/store';
import { loadwishlistfromstorage } from '../slice/wishlistSlice';



export default function Header() {
    const [setting, setSetting] = useState('')
    const [logo, setLogo] = useState('')

    const [menu, setMenu] = useState([])

    const [searchText, setsearchText] = useState('');

    const router = useRouter();

    let mycart = useSelector((myStore) => myStore.cartReducer.cart);

    let mywish = useSelector((myStore) => myStore.wishlist.coursewishlist);

    let dispatch = useDispatch();

    let isLoggedIn = useSelector((loginstate) => {
        return loginstate.login.token;
    })



    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_SETTING)
            .then((result) => {
                if (result.data._status == true) {
                    setSetting(result.data._data)
                    setLogo(result.data.setting_image_path + result.data._data.logo);

                } else {
                    setSetting(null)
                    setLogo(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_MENU)
            .then((result) => {
                if (result.data._status == true) {
                    setMenu(result.data._data)
                    console.log(result.data._data);
                } else {
                    setMenu([])
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])



    useEffect(() => {
        dispatch(loadwishlistfromstorage())
    }, [])




    return (
        <>
            <div className="container-fluid bg-light py-2 ">
                <div className="row align-items-center">
                    <div className="col-lg-4 text-muted small">
                        {setting.phone && (
                            <a href={`tel:${setting.phone}`} className="text-decoration-none text-muted">{setting.phone}</a>
                        )}
                        {setting.phone && setting.email && " |"}
                        {setting.email && (
                            <a href={`mailto:${setting.email}`} className="text-decoration-none text-muted"> {setting.email}</a>
                        )}
                    </div>
                    <div className="col-lg-4 d-sm-my-3 d-lg-my-0">
                        <div className="search-form mt-2 mt-lg-0">
                            <input type='text' className='form-control' name='search_course' placeholder='search courses' value={searchText} onChange={(e) => setsearchText(e.target.value)} onKeyUp={(e) => {
                                if (e.key === 'Enter' && searchText.trim()) {
                                    router.push(`/course?search=${encodeURIComponent(searchText)}`)
                                }
                            }} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center gap-4 justify-content-start justify-content-lg-end mt-2 mt-lg-0">

                            {/* Cart */}
                            <Link href="/cart" className="nav-link d-flex align-items-center gap-1 fw-semibold">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span>Cart <sup>{mycart.length == 0 ? '' : mycart.length}</sup></span>


                            </Link>

                            {/* Wishlist */}
                            <Link href="/wishlist" className="nav-link d-flex align-items-center gap-1 fw-semibold">
                                <i className="fa fa-heart"></i>
                                <span>Wishlist <sup>{mywish.length == 0 ? '' : mywish.length}</sup></span>

                            </Link>

                        </div>

                    </div>

                </div>
            </div>

            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0" style={{ top: "-100px" }}>
                <Link href="/" className="navbar-brand d-flex align-items-center px-2">
                    <h2 className="m-0 ">{setting.sitename}</h2>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {menu.map((items) => (
                            items.children && items.children.length > 0 ? (
                                <div className="nav-item dropdown" key={items._id}>
                                    <Link href={items.link} className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{items.name}</Link>
                                    <div className="dropdown-menu fade-down m-0">
                                        {items.children.map((child, childIndex) => (
                                            <Link href={child.link} key={child._id} className="dropdown-item">{child.name}</Link>
                                        ))}

                                    </div>
                                </div>
                            ) : (
                                <Link href={`${items.link}`} key={items._id} className="nav-item nav-link active">{items.name}</Link>
                            )
                        ))}



                        {isLoggedIn ?
                            (<>
                                <Link href="/my-dashboard" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                                    Dashboard <i className="fa fa-arrow-right ms-3"></i>
                                </Link>

                            </>) : (<Link href="/login-register" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Login/Register<i className="fa fa-arrow-right ms-3"></i></Link>)}


                    </div>
                </div>
            </nav>
        </>
    )
}
