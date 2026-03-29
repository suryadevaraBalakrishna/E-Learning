import React, { Suspense } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import ResetPassword from '../components/ResetPasswordComponents/ResetPassword'


export default function page() {
  return (
    <>
  <Breadcrumb  title="Reset Password" parent_link="/" parent="Home"/>
  <Suspense fallback={<div>Loading...</div>}>
  <ResetPassword/>
  </Suspense>
  
  </>
  )
}
