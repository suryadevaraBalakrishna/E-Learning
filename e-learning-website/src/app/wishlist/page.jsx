import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Wishlist from '../components/WishlistComponents/Wishlist'

export default function page() {
    return (
        <>
            <Breadcrumb title="Wishlist" parent_link="/" parent="Home" />
            <Wishlist />
        </>
    )
}
