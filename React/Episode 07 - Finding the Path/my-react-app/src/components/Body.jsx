import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer'; // Assuming you have this component
import resList from '../utils/mockData';


const Body = () => {
  // State for the original, full list of restaurants (fetched once)
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  // State for the list currently being displayed (can be filtered/searched)
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  // State for the search input
  const [searchText, setSearchText] = useState('');

  // console.log('Body rendered'); // Optional: for debugging re-renders

  // if no dependepnct array it render every time  compnent render
  // if empty [] only once in the initiaL STAGE 
  // [dependecy] only if dependency changes.Props Functions Derived values useState` values 

  useEffect(() => {
    fetchData();
  }, []);

 

  const fetchData = async () => {
    // In a real app, fetch from API:
    try {
    
        const data = await fetch(
          'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
        );
      
        const json = await data.json();
        // console.log(json);

        // console.log(json?.data?.cards?.[1].card?.card?.gridElements?.infoWithStyle?.restaurants?.[0]?.info?.name);
        const data2 = json?.data?.cards?.[1].card?.card?.gridElements?.infoWithStyle?.restaurants;
        console.log(data2)
        setListOfRestaurants(data2);
      setFilteredRestaurant(data2);
      
    }catch (error) {
      console.error("Failed to fetch restaurants:", error);
      // Handle error state if needed
      setListOfRestaurants([]);
      setFilteredRestaurant([]);
    }

    // Using hardcoded data for now:
    // console.log("Using hardcoded data");
    // Make sure resList contains the correct structure if you copy-pasted
    // It looks like each item in your resList IS the restaurant object needed.
    // setListOfRestaurants(resList);
    // setFilteredRestaurant(resList); // Initialize displayed list with all restaurants
  };

  // --- Search Handler ---
  const handleSearch = () => {
    console.log('Searching for:', searchText);
    const filtered = listOfRestaurants.filter((res) =>
      // Safely access nested properties with optional chaining (?.)
      res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered); // Update the DISPLAYED list
  };

  // --- Filter Top Rated Handler ---
  const handleFilterTopRated = () => {
    console.log('Filtering top rated');
    const filtered = listOfRestaurants.filter(
      // Convert avgRating to number for comparison if it's a string
      (res) => parseFloat(res?.info?.avgRating) > 4.5 
    );
    setFilteredRestaurant(filtered); // Update the DISPLAYED list
  };

   // --- Reset Filter Handler (Optional but Recommended) ---
   const handleShowAll = () => {
    console.log('Showing all restaurants');
    setFilteredRestaurant(listOfRestaurants); // Reset displayed list to the original full list
    setSearchText(''); // Also clear search text
  };

  // --- Conditional Rendering for Loading State ---
  // Show shimmer only if the initial fetch hasn't populated the list yet
  if (listOfRestaurants.length === 0) {
     console.log("Showing Shimmer");
     // You might want multiple shimmer cards, e.g., using Array(10).fill(0).map(...)
     return <Shimmer />; 
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="searchBox"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              // Optional: Trigger search on every keystroke (live search)
              // Comment out handleSearch() call in the button if you use this
              // const filtered = listOfRestaurants.filter((res) =>
              //   res?.data?.name?.toLowerCase().includes(e.target.value.toLowerCase())
              // );
              // setFilteredRestaurant(filtered);
            }}
            // Optional: Allow searching by pressing Enter
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button> 
        </div>
        <button
          className="filter-btn"
          onClick={handleFilterTopRated} // Use the corrected handler
        >
          Top Rated Restaurants
        </button>
        {/* Optional Reset Button */}
        <button
          className="filter-btn"
          onClick={handleShowAll}
        >
          Show All
        </button>
      </div>

      {/* --- Restaurant List Display --- */}
      <div className="res-container">
        {/* Check if filtered list is empty AFTER loading */}
        {filteredRestaurant.length === 0 ? (
          <p>No restaurants match your criteria.</p> 
        ) : (
          filteredRestaurant.map((restaurant) => (
            // Ensure resData gets the nested data object RestaurantCard expects
            <RestaurantCard key={restaurant?.info?.id} resData={restaurant} /> 
          ))
        )}
      </div>
    </div>
  );
};

export default Body;