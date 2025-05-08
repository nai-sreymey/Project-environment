import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface CardProps {
  title: string;
  image: string;
  description: string;
  id: string; // Add an id prop to uniquely identify each card
}

const Card: React.FC<CardProps> = ({ title, image, description, id }) => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle button click to navigate to the detail page
  const handleDetailClick = () => {
    navigate(`/detail/${id}`); // Navigate to the detail page with the card's id
  };

  // Handle back button click to navigate to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[250px] md:w-[300px] hover:shadow-lg transition overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-600 mt-2 break-words">{description}</p>

      {/* Button Container with Flexbox */}
      <div className="mt-4 flex justify-between gap-4">
        {/* Back Button (Left) */}
        <button
          onClick={handleBackClick} // Navigate back to the previous page
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>

        {/* Detail Button (Right) */}
        <button
          onClick={handleDetailClick} // Navigate to detail page
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default Card;
