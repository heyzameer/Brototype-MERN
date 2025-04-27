// import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constants";
import useRestuarantMenu from "../utils/useRestuarantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL } from '../utils/constants';
import { useState } from "react";


const RestuarantMenu = () => {
  //   const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const [showIndex,setShow] = useState(0);

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
    // console.log(restaurant);

  const { name, cuisines, costForTwoMessage, avgRating, sla,cloudinaryImageId } = restaurant;

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
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg font-[Segoe_UI]">
        {/* Header: Image + Info Side by Side */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start">
          
          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-[#333]">{name}</h1>
            <p className="mt-2 text-sm text-[#666]">{cuisines?.join(', ')}</p>
            <p className="mt-1 text-sm text-[#666]">{costForTwoMessage}</p>
    
            <div className="flex justify-center sm:justify-start gap-4 mt-3 text-[#444] text-sm">
              <span className="flex items-center gap-1">⭐ {avgRating}</span>
              <span className="flex items-center gap-1">⏱️ {deliveryTime} mins</span>
            </div>
          </div>

          {/* Image */}
          <img
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            className="w-full sm:w-1/2 rounded-xl h-[160px] object-cover shadow-sm"
          />
        </div>
    
        {/* Menu Title */}
        <h2 className="mt-8 text-lg font-semibold text-[#444] border-b pb-2 border-[#ddd]">
          Menu
        </h2>
    
        {/* Accordion Section */}
        <div className="mt-4">
          {categories.map((category, index) => (
            <RestaurantCategory key={index} data={category?.card?.card} showItems={index===showIndex?true:false} setShow={()=>setShow(index)}/>
          ))}
        </div>
      </div>
    );
    
    
};

export default RestuarantMenu;
// category[1].card.card.title  ---- accordian header 
// category[1].card.card.itemCards.map((item)=>item.card.info.name  and item.card.info.price --- accordian  data