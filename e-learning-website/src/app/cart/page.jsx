import React from 'react'
import ShoppingCart from '../components/CartComponents/ShoppingCart'
import Breadcrumb from '../components/common/Breadcrumb'


export default function page() {
    return (
        <>
            <Breadcrumb title="Cart" parent_link="/" parent="Home" />
            <ShoppingCart />
        </>
    )
}
