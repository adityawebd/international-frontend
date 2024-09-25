import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);  // Number of full stars
    const hasHalfStar = rating % 1 !== 0;    // Boolean for half star
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
        <div className="flex text-yellowClr">
            {/* Render full stars */}
            {Array(filledStars).fill().map((_, index) => (
                <FaStar key={index} />
            ))}

            {/* Render half star if present */}
            {hasHalfStar && <FaStarHalfAlt />}

            {/* Render empty stars */}
            {Array(emptyStars).fill().map((_, index) => (
                <FaRegStar key={index + filledStars + (hasHalfStar ? 1 : 0)} />
            ))}
        </div>
    );
};

export default StarRating;
