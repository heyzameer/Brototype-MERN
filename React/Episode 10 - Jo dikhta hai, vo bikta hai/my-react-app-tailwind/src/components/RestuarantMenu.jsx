// import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { MENU_API } from '../utils/constants';
import useRestuarantMenu from '../utils/useRestuarantMenu';

const RestuarantMenu = () => {
//   const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestuarantMenu(resId)

// created a custom hook to get the data by folowing single responsibilty principle
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await fetch(`${MENU_API}${resId}`);
//         const json = await response.json();
//         setResInfo(json.data);
//       } catch (error) {
//         console.error("Failed to fetch menu:", error);
//       }
//     };

//     fetchMenu();
//   }, [resId]);

  if (!resInfo) return <Shimmer />;

  const restaurant = resInfo?.cards?.[2]?.card?.card?.info;

  if (!restaurant) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Restaurant info not available.</p>;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    sla,
  } = restaurant;

  const { deliveryTime } = sla || {};

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards;

  return (
    <div className="max-w-xl mx-auto mt-4 p-8 bg-[#f8f8f8] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-[Segoe_UI]">
  <h1 className="text-2xl mb-2 text-[#333]">{name}</h1>
  <h3 className="my-1 text-[#666] font-medium">{cuisines?.join(", ")}</h3>
  <h3 className="my-1 text-[#666] font-medium">{costForTwoMessage}</h3>
  <h3 className="my-1 text-[#666] font-medium">⭐ {avgRating}</h3>
  <h3 className="my-1 text-[#666] font-medium">⏱️ {deliveryTime} mins</h3>

  <h2 className="mt-8 text-xl text-[#444] border-b-2 border-[#ccc] pb-1">Menu</h2>

  {itemCards?.length > 0 ? (
    <ul className="mt-4 list-none p-0">
      {itemCards.map((item) => (
        <li
          key={item.card.info.id}
          className="bg-white p-4 mb-3 rounded-lg shadow-sm flex justify-between font-medium text-[#333]"
        >
          {item.card.info.name} - ₹
          {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-4 text-[#555]">Menu is not available for this restaurant.</p>
  )}
</div>
  );
};

export default RestuarantMenu;
