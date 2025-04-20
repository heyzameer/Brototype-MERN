import { useEffect, useState } from 'react';
import RestaurantCard,{withPromotedLabel} from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';


const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');


  const RestuarantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await response.json();
        const restaurants = json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setAllRestaurants(restaurants);
        setDisplayedRestaurants(restaurants);
        console.log(restaurants);
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

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <h1 style={{ textAlign: 'center', marginTop: '100px', color: 'red' }}>
        Looks like you're offline. Please check your internet connection.
      </h1>
    );
  }
  
  if (!allRestaurants.length) {
    return <Shimmer />;
  }
  

  return (
    <div className="px-4">
  {/* Filter Section */}
  <div className="flex flex-wrap justify-center items-center gap-5 my-8">
    {/* Search Input + Button */}
    <div className="flex w-full md:w-2/5">
      <input
        type="text"
        placeholder="Search restaurants..."
        className="w-full bg-white text-black border border-[#aabcca] border-r-0 rounded-l-md outline-none px-5 py-[14px] shadow-sm"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="text-white bg-green-600 hover:bg-green-700 px-5 py-[14px] rounded-r-md shadow-sm transition-colors"
      >
        Search
      </button>
    </div>

    {/* Filter Buttons */}
    <button
      onClick={handleFilterTopRated}
      className="bg-green-600 text-white px-5 py-[14px] rounded-md shadow-sm hover:bg-green-700 transition-colors"
    >
      Top Rated Restaurants
    </button>
    <button
      onClick={handleShowAll}
      className="bg-green-600 text-white px-5 py-[14px] rounded-md shadow-sm hover:bg-green-700 transition-colors"
    >
      Show All
    </button>
  </div>

  {/* Restaurant Cards Grid */}
  <div className="flex flex-wrap justify-center gap-5 px-4">
    {displayedRestaurants.length === 0 ? (
      <p className="text-center text-lg">No restaurants match your criteria.</p>
    ) : (
      displayedRestaurants.map((res) => (
        <Link
          key={res?.info?.id}
          to={"restuarants/" + res?.info?.id}
          className="no-underline text-inherit"
        >
          {parseFloat(res?.info?.avgRating) >= 4.5 ? (<RestuarantCardPromoted resData={res}/> ): (<RestaurantCard resData={res} />)}
          
        </Link>
      ))
    )}
  </div>
</div>

  );
};

export default Body;