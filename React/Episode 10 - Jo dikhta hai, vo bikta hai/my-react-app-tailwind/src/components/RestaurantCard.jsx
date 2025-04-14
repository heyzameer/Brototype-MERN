import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info || {};

  const { deliveryTime } = sla || {};

  return (
    <div
  className="w-[200px] bg-[#f0f0f0] rounded-xl shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
>
  {/* Restaurant Image */}
  <img
    className="w-full h-[200px] object-cover rounded-t-xl"
    src={CDN_URL + cloudinaryImageId}
    alt="Biryani"
  />

  {/* Restaurant Info */}
  <div className="p-3 flex flex-col gap-2 text-left">
    <h3 className="text-lg font-semibold">{name}</h3>
    <hr />
    <em className="text-sm text-gray-600">{cuisines.join(", ")}</em>
    <h4 className="text-sm">⭐ {avgRating}</h4>
    <h4 className="text-sm">{costForTwo}</h4>
    <h4 className="text-sm">{deliveryTime} minutes</h4>
  </div>
</div>

  );
};

export default RestaurantCard;
