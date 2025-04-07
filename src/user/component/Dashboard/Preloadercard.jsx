import React from 'react';

const CardPreloader = () => {
  const skeletons = Array.from({ length: 12 });

  return (
    <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full h-full">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="w-full h-full bg-white rounded-xl shadow-md p-4 animate-pulse"
        >
          <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default CardPreloader;
