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

  // Fetch data only on initial mount
  // if no dependency array called evry time component renders
  // if dependency array is empty clled only once aftyer initial render
  // if given dependency array it only be called when dependency changes
  useEffect(() => {
    fetchData();
  }, []);

  // --- Hardcoded Data (Keep as is for now) ---


  const fetchData = async () => {
    // In a real app, fetch from API:
    // try {
    //   const response = await fetch('YOUR_API_ENDPOINT');
    //   if (!response.ok) throw new Error('Network response was not ok');
    //   const json = await response.json();
    //   // --- IMPORTANT: Extract the actual restaurant array from the API response ---
    //   // This path might differ based on the real API structure
    //   const restaurants = json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []; 
    //   setListOfRestaurants(restaurants);
    //   setFilteredRestaurant(restaurants); // Initialize displayed list with all restaurants
    // } catch (error) {
    //   console.error("Failed to fetch restaurants:", error);
    //   // Handle error state if needed
    //   setListOfRestaurants([]);
    //   setFilteredRestaurant([]);
    // }

    // Using hardcoded data for now:
    console.log("Using hardcoded data");
    // Make sure resList contains the correct structure if you copy-pasted
    // It looks like each item in your resList IS the restaurant object needed.
    setListOfRestaurants(resList);
    setFilteredRestaurant(resList); // Initialize displayed list with all restaurants
  };

  // --- Search Handler ---
  const handleSearch = () => {
    console.log('Searching for:', searchText);
    const filtered = listOfRestaurants.filter((res) =>
      // Safely access nested properties with optional chaining (?.)
      res?.data?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered); // Update the DISPLAYED list
  };

  // --- Filter Top Rated Handler ---
  const handleFilterTopRated = () => {
    console.log('Filtering top rated');
    const filtered = listOfRestaurants.filter(
      // Convert avgRating to number for comparison if it's a string
      (res) => parseFloat(res?.data?.avgRating) > 4 
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
            <RestaurantCard key={restaurant?.data?.id} resData={restaurant} /> 
          ))
        )}
      </div>
    </div>
  );
};

export default Body;