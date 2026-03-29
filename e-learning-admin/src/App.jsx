import React, { useState } from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Dashboard from './components/pages/Dashboard';
import WebsiteSetting from './components/pages/website-setting/WebsiteSetting';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MenuSetting from './components/pages/menu-setting/MenuSetting';
import EditSetting from './components/pages/menu-setting/EditSetting';
import NewsletterSetting from './components/pages/newsletter-setting/NewsletterSetting';
import AddSlider from './components/pages/slider-setting/AddSlider';
import EditSlider from './components/pages/slider-setting/EditSlider';
import AddService from './components/pages/service-setting/AddService';
import EditService from './components/pages/service-setting/EditService';
import About from './components/pages/about-setting/About';
import AddTeam from './components/pages/team-setting/AddTeam';
import EditTeam from './components/pages/team-setting/EditTeam';
import Course from './components/pages/course/Course';
import AddCategory from './components/pages/category/AddCategory';
import EditCategory from './components/pages/category/EditCategory';
import AddCourse from './components/pages/course/AddCourse';
import EditCourse from './components/pages/course/EditCourse';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import Account from './components/pages/accounts/Account';
import ResetPassword from './components/pages/ResetPassword';
import Orders from './components/pages/orders/Orders';

function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password'  element={<ResetPassword/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/website-setting' element={<WebsiteSetting />} />
            <Route path='/menu-setting/edit/:id' element={<EditSetting />} />
            <Route path='/menu-setting' element={<MenuSetting />} />
            <Route path='/newsletter-setting' element={<NewsletterSetting />} />
            <Route path='/add-slider' element={<AddSlider />} />
            <Route path='/slider/edit/:id' element={<EditSlider />} />
            <Route path='/add-service' element={<AddService />} />
            <Route path='/service/edit/:id' element={<EditService />} />
            <Route path='/about' element={<About />} />
            <Route path='/add-team' element={<AddTeam />} />
            <Route path='/team/edit/:id' element={<EditTeam />} />
            <Route path='/course' element={<Course />} />
            <Route path='/add-category' element={<AddCategory />} />
            <Route path='/edit-category/:id' element={<EditCategory />} />
            <Route path='/add-course' element={<AddCourse/>} />
            <Route path='/edit-course/:id' element={<EditCourse/>}/>
            <Route path='/accounts' element={<Account/>}/>
            <Route path='/orders' element={<Orders/>}/>
           </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
