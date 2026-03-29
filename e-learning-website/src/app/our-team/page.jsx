import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import ExpertInstructors from '../components/HomeComponents/ExpertInstructors'

export default function page() {
  return (
    <>
    <Breadcrumb title="Our Team" parent_link="/" parent="Home"/>
    <ExpertInstructors/>
    </>
  )
}
