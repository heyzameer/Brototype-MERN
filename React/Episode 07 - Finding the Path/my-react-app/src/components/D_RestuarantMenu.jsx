import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { MENU_API } from '../utils/constants';

const RestuarantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${MENU_API}${resId}`);
        const json = await response.json();
        setResInfo(json.data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, [resId]);

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
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines?.join(", ")}</h3>
      <h3>{costForTwoMessage}</h3>
      <h3>⭐ {avgRating}</h3>
      <h3>⏱️ {deliveryTime} mins</h3>

      <h2>Menu</h2>

      {itemCards?.length > 0 ? (
        <ul>
          {itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - ₹
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))}
        </ul>
      ) : (
        <p>Menu is not available for this restaurant.</p>
      )}
    </div>
  );
};

export default RestuarantMenu;
