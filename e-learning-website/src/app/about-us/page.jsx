import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Services from '../components/HomeComponents/Services'
import AboutUs from '../components/HomeComponents/AboutUs'
import ExpertInstructors from '../components/HomeComponents/ExpertInstructors'

export default function page() {
  return (
    <>
    <Breadcrumb title="About Us" parent_link="/" parent="Home"/>
    <Services/>
    <AboutUs/>
    <ExpertInstructors/>
    </>
  )
}
