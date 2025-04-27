import { useState } from 'react';
import ItemList from './ItemList';

const RestaurantCategory = ({ data,setShow,showItems}) => {

  const toggleAccordion = () => {
    setShow();
    // setShow(showItems ? -1 : data.title);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="my-6 bg-white shadow-md rounded-xl overflow-hidden border">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-center px-6 py-4 bg-gray-100 cursor-pointer"
          onClick={toggleAccordion}
        >
          <span className="font-semibold text-xl text-gray-800">
            {data.title}{' '}
            <span className="text-gray-500">({data.itemCards.length})</span>
          </span>
          <span className="text-lg transition-transform duration-300 ease-in-out">
            {showItems? '🔼' : '🔽'}
          </span>
        </div>

        {/* Accordion Body */}
        {showItems && (
          <div className="px-4 py-2 bg-white">
            <ItemList items={data.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategory;
