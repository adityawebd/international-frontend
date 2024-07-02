import React from 'react'

const BestSellCard = (props) => {
    return (
        <div className="products_card">
            <a href={props.card_link}>
                <img className='rounded-2xl' src={props.img_src} alt={props.img_title} />
                <div className="card_content">
                    <div className="sku_id"> {props.sku_id} </div>
                    <div className="title"> {props.title}</div>
                    <div className="price">₹{props.discounted_price} &nbsp; <span>₹{props.actual_price}</span></div>
                </div>
            </a>
        </div>
    )
}

export default BestSellCard
