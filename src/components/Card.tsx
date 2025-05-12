import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  image: string;
  description: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDetailClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/detail/${id}`);
    }, 700); // 2 seconds delay
  };

  const handleBackClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000); // 2 seconds delay
  };

  return (
    <>
      {/* Fullscreen loading spinner */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[250px] md:w-[300px] hover:shadow-lg transition overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-600 mt-2 break-words">{description}</p>

        <div className="mt-4 flex justify-between gap-4">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>

          <button
            onClick={handleDetailClick}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Detail
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
