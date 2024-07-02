import React from 'react'

const AllCollectionCard = (props) => {
    return (
        <div>
            <div className="all_collection_card flex align-middle justify-between">
                <div className="content flex flex-col align-middle justify-center ">
                    <p className='title text-xl light_black_font'>{ props.title } </p>
                    <h2 className='tagline mt-2 text-3xl font-bold tracking-widest light_black_font uppercase'> { props.tagline }</h2>
                    <div className="discount mt-3 wider light_black_font"> {props.discount_text} { props.discount }% Discount </div>
                </div>
                <figure className=''>
                    <img src={props.img_src} alt={props.img_title} />
                </figure>

                <div className="show_all_collection_btn">
                    <div className="all_collection_card_btn">
                        <a className='uppercase text-sm' href={props.order_link}>order now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCollectionCard
