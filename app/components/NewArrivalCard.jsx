import React from 'react'
import { IoCart } from "react-icons/io5";


const NewArrivalCard = (props) => {
    return (
        <div className="products_card">
            <a href={props.card_link}>
                <img className='rounded-2xl' src={props.img_src} alt={props.img_title} />
                <div className="card_content">
                    <div className="sku_id"> {props.sku_id} </div>
                    <div className="product_card_items">
                        <div className="product_card_text">
                            <div className="title"> {props.title}</div>
                            <div className="price">₹{props.discounted_price} &nbsp; <span>₹{props.actual_price}</span></div>
                        </div>
                        <div className="cart_icon"> <IoCart /> </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NewArrivalCard
