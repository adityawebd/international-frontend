import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Breadcrumbs = (props) => {
    return (
        <div>
            <div className="bg_gray py-3">
                <div className="container">
                    <div className="flex justify-between align-middle">
                        <h3 className='font-medium'>{props.page_title}</h3>
                        <div className="breadcrumbs flex justify-between align-middle">
                            <a href="/" className='text-sm'>Home</a>
                            <div className='breadcrumbs flex justify-between align-middle text-sm text-blue-600/100'> <span><MdKeyboardDoubleArrowRight /></span> {props.page_title} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs
