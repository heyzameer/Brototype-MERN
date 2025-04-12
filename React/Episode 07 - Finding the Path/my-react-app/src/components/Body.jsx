import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';


const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
        );
        const json = await response.json();
        const restaurants = json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setAllRestaurants(restaurants);
        setDisplayedRestaurants(restaurants);
      } catch (error) {
        console.error('Fetch error:', error);
        setAllRestaurants([]);
        setDisplayedRestaurants([]);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = allRestaurants.filter((res) =>
      res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedRestaurants(filtered);
  };

  const handleFilterTopRated = () => {
    const filtered = allRestaurants.filter(
      (res) => parseFloat(res?.info?.avgRating) > 4.5
    );
    setDisplayedRestaurants(filtered);
  };

  const handleShowAll = () => {
    setDisplayedRestaurants(allRestaurants);
    setSearchText('');
  };

  if (!allRestaurants.length) return <Shimmer />;

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="searchBox"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="filter-btn" onClick={handleFilterTopRated}>
          Top Rated Restaurants
        </button>
        <button className="filter-btn" onClick={handleShowAll}>
          Show All
        </button>
      </div>

      <div className="res-container">
        {displayedRestaurants.length === 0 ? (
          <p>No restaurants match your criteria.</p>
        ) : (
          displayedRestaurants.map((res) => (
           <Link key={res?.info?.id} to={"restuarants/"+res?.info?.id}> <RestaurantCard  resData={res} /></Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;