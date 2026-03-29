import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import CourseWrapper from '../components/CourseComponents/CourseWrapper'

export default function page() {
  return (
   <>
   <Breadcrumb title="Our Course" parent_link="/" parent="Home"/>
   <CourseWrapper/>
   </>
  )
}
