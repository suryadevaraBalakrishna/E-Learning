'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseItem from '../common/CourseItem';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { useSearchParams } from 'next/navigation';

export default function CourseWrapper() {
    const [courseCategory, setcourseCategory] = useState([]);
    const [courseInstructor, setcourseInstructor] = useState([]);
    const [courseList, setcourseList] = useState([]);
    const [courseimagepath, setcourseimagepath] = useState('');
    const [checkedcategory, setcheckedcategory] = useState([]);
    const [checkedinstructor, setcheckedinstructor] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState(1);
    const [sort,setsort]=useState('');
    const [coursevideopath,setcoursevideopath]=useState('');
       
    //search
    const searchParams=useSearchParams();
    const search=searchParams.get('search') || '';

    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_CATEGORY)
            .then((result) => {
                if (result.data._status == true) {
                    setcourseCategory(result.data._data);
                } else {
                    setcourseCategory([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }, [])




    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_TEAM)
            .then((result) => {
                if (result.data._status == true) {
                    setcourseInstructor(result.data._data);
                } else {
                    setcourseInstructor([]);
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }, [])



    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + process.env.NEXT_PUBLIC_WEBSITE_COURSE, {
            limit: 6,
            categories_id: checkedcategory,
            instructor_id: checkedinstructor,
            page: currentPage,
            name:search,
            sort:sort
        })
            .then((result) => {
                if (result.data._status == true) {
                    setcourseList(result.data._data);
                    setcourseimagepath(result.data._course_image_path);
                    setcurrentPage(result.data._pagination.current_page);
                    settotalPages(result.data._pagination.total_pages);
                    setcoursevideopath(result.data._course_video_path);

                } else {
                    setcourseList([]);
                    setcourseimagepath('');
                    setcurrentPage(1);
                    settotalPages(1);
                      setcoursevideopath('');
                }
            })
            .catch((error) => {
                console.log(error);
            })


    }, [checkedcategory, checkedinstructor, currentPage,sort])




    let handleCheckedCategory = ((selectedcategory) => {
        setcheckedcategory((prev) => (prev == selectedcategory ? '' : selectedcategory))
    })


    let handleCheckedInstructor = ((selectedInstructor) => {
        setcheckedinstructor((prev) => (prev == selectedInstructor ? '' : selectedInstructor))
    })


    let handlepagechange = (page) => {
        setcurrentPage(page);
    }

    let handleSort=(event)=>{
        setsort(event.target.value);
    }


    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-3 shadow rounded p-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4>Categories</h4>
                            <ul className="space-y-3">
                                {courseCategory.map((items, index) => {
                                    return (
                                        <li key={index} className='list-item list-style-none'><input type="checkbox" value={items._id} onChange={() => handleCheckedCategory(items._id)} checked={checkedcategory == items._id} /><label className="mx-2">{items.name}</label></li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <h4>Instructor</h4>
                            <ul className="space-y-3">
                                {courseInstructor.map((items, index) => {
                                    return (
                                        <li key={index} className='list-item list-style-none'><input type="checkbox" value={items._id} onChange={() => handleCheckedInstructor(items._id)} checked={checkedinstructor == items._id} /><label className="mx-2">{items.name}</label></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">

                        <div className="col-lg-12 d-flex justify-content-end ">
                            <select name="sort" className='form-control w-25 mb-3' onChange={handleSort}  >
                               <option value="">select sort</option>
                                <option value="price_low">Price Low</option>
                                 <option value="price_high">Price High</option>
                                  <option value="name_asc">Name Ascending</option>
                                   <option value="name_desc">Name Descending</option>
                            </select>
                        </div>

                        {courseList.length != 0 ? (
                            <>
                                <CourseItem mycourses={courseList} course_image_path={courseimagepath} course_video_path={coursevideopath} />
                            </>
                        ) : (
                            <p>No Courses</p>
                        )}

                    </div>
                    {totalPages > 1 ?(
                      <>
                        <ResponsivePagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlepagechange}
                    />
                      </>
                    ):(
                      ''
                    )}
                  
                </div>
            </div>
        </div>
    )
}
