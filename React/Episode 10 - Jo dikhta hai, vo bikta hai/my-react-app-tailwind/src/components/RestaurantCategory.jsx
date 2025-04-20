import ItemList from './ItemList';

const RestaurantCategory = ({data}) => {
  // const handleClick = () => {
  //   setShowIndex();
  // };

console.log("cat");
console.log(data.itemCards);
  return (
    <div>
    {/*Accordion Header */}
    <div className=" mx-auto my-4 bg-gray-50 shadow-lg p-4 rounded-b-md">
      <div
        className="flex justify-between cursor-pointer"
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>🔽</span>
      </div>
      {/* Accordion Body */}
      {<ItemList items={data.itemCards}  />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
