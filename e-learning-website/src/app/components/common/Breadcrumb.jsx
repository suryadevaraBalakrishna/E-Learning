import React from 'react'

export default function Breadcrumb({title,parent,parent_link}) {
  return (
  <div className="container-fluid bg-light py-5 mb-5 page-header">
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                    <h1 className="display-3 text-dark animated slideInDown">{title}</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a className="text-dark text-decoration-none" href={parent_link}>{parent}</a></li>

                            <li className="breadcrumb-item text-dark active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  )
}
