import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Contact from '../components/ContactComponents/Contact'

export default function page() {
  return (
    <>
    <Breadcrumb title="Contact" parent="Home" parent_link="/"/>
    <Contact/>
    </>
  )
}
