    import React, { useState } from 'react';
    import { FaStar } from "react-icons/fa6";

    const NewCom = () => {
        const [activeTestimonial, setActiveTestimonial] = useState(0); // Default to the first testimonial

        const testimonials = [
            {
                id: 1,
                feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint minima consequatur deleniti repellat rerum non. Voluptatibus quia maxime esse! Doloribus mollitia esse dicta quasi?",
                name: "Jhon Doe",
                position: "General Manager",
                img: "/assets/images/testimonial/1.jpg"
            },
            {
                id: 2,
                feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint minima consequatur deleniti repellat rerum non. Voluptatibus quia maxime esse! Doloribus mollitia esse dicta quasi?",
                name: "Jane Doe",
                position: "Marketing Director",
                img: "/assets/images/testimonial/2.jpg"
            },
            {
                id: 3,
                feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sint minima consequatur deleniti repellat rerum non. Voluptatibus quia maxime esse! Doloribus mollitia esse dicta quasi?",
                name: "Alice Smith",
                position: "CEO",
                img: "/assets/images/testimonial/3.jpg"
            }
        ];

        const handleClick = (index) => {
            setActiveTestimonial(index);
        };

        return (
            <div>
                <div className="testimonials py-5">
                    <div className="container">
                        <h3 className='mb-2 font-semibold text-3xl text-center light_black_font'>Client Review</h3>
                        <p className='text-center text-sm light_black_font'>What clients say about us</p>

                        <div className="feedback_scrollable">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`testimonials_wrapper ${activeTestimonial === index ? 'active' : ''}`}
                                    style={{ transform: `translateX(${-100 * activeTestimonial}%)` }}
                                >
                                    <div className="quote_1">
                                        <img src="/assets/images/testimonial/quotes-1.svg" alt="Quote" />
                                    </div>
                                    <div className="main_feedback">
                                        <p className='text-sm light_black_font leading-6'>{testimonial.feedback}</p>
                                        <p className='text-xl green_font font-semibold mt-3'>{testimonial.name}</p>
                                        <p className='text-xl light_black_font font-bold'>{testimonial.position}</p>
                                        <div className="stars flex align-middle mr-3">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className='colored_star'><FaStar /></span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="quote_2">
                                        <img src="/assets/images/testimonial/quotes-2.svg" alt="Quote" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="testimonials_avatar">
                            {testimonials.map((testimonial, index) => (
                                <img
                                    key={testimonial.id}
                                    src={testimonial.img}
                                    alt={`Avatar ${index + 1}`}
                                    onClick={() => handleClick(index)}
                                    className={`avatar ${activeTestimonial === index ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default NewCom;
