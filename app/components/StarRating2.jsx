import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating2 = ({ rating, onRatingChange }) => {
    const totalStars = 5;
    const [hoveredStar, setHoveredStar] = useState(null); // State for hovered star
    const [selectedRating, setSelectedRating] = useState(rating || 0); // State for selected rating

    const handleClick = (index) => {
        setSelectedRating(index);
        onRatingChange(index); // Notify parent about the rating change
    };

    const handleMouseEnter = (index) => setHoveredStar(index);
    const handleMouseLeave = () => setHoveredStar(null);

    return (
        <div className="flex text-yellowClr">
            {Array.from({ length: totalStars }, (_, index) => {
                const starIndex = index + 1;
                const isFilled = starIndex <= (hoveredStar || selectedRating);
                const isHalf = starIndex === Math.ceil(selectedRating) && !isFilled;

                return (
                    <div
                        key={index}
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer"
                    >
                        {isFilled ? (
                            isHalf ? <FaStarHalfAlt /> : <FaStar />
                        ) : (
                            <FaRegStar />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating2;
