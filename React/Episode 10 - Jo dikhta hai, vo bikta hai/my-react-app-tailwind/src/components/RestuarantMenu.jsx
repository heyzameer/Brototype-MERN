// import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constants";
import useRestuarantMenu from "../utils/useRestuarantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestuarantMenu = () => {
  //   const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestuarantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const restaurant = resInfo?.cards?.[2]?.card?.card?.info;
  // console.log("hello");
  

  if (!restaurant)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Restaurant info not available.
      </p>
    );

  const { name, cuisines, costForTwoMessage, avgRating, sla } = restaurant;

  const { deliveryTime } = sla || {};
  // console.log(resInfo);
  // const itemCards =
  //   resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards;


  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );
    // console.log("hello");
    // console.log(categories[0].card.card);

  return (
    <div className="max-w-xl mx-auto mt-4 p-8 bg-[#f8f8f8] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-[Segoe_UI]">
      <h1 className="text-2xl mb-2 text-[#333]">{name}</h1>
      <h3 className="my-1 text-[#666] font-medium">{cuisines?.join(", ")}</h3>
      <h3 className="my-1 text-[#666] font-medium">{costForTwoMessage}</h3>
      <h3 className="my-1 text-[#666] font-medium">⭐ {avgRating}</h3>
      <h3 className="my-1 text-[#666] font-medium">⏱️ {deliveryTime} mins</h3>

      <h2 className="mt-8 text-xl text-[#444] border-b-2 border-[#ccc] pb-1">
        Menu
      </h2>
      {categories.map((category)=>[
        <RestaurantCategory data = {category?.card?.card}/>
      ])}
      
    </div>
  );
};

export default RestuarantMenu;
// category[1].card.card.title  ---- accordian header 
// category[1].card.card.itemCards.map((item)=>item.card.info.name  and item.card.info.price --- accordian  data