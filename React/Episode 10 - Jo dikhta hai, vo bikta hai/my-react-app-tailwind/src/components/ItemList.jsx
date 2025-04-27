import { CDN_URL } from '../utils/constants';

const ItemList = ({ items }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-between gap-4 border-b pb-6"
        >
          {/* Left: Info */}
          <div className="w-3/4">
            <div className="mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {item.card.info.name}
              </h3>
              <span className="text-sm text-gray-700">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {item.card.info.description}
            </p>
          </div>

          {/* Right: Image + Button */}
          <div className="relative w-1/4">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="rounded-lg w-full h-[100px] object-cover shadow-sm"
            />
            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-black border hover:border-black transition-all">
              Add +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
