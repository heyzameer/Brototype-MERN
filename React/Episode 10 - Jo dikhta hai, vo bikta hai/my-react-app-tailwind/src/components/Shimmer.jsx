const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-around">
      {Array(24)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[400px] bg-[#d0c8c8] m-5 rounded-[11px] animate-pulse"
          ></div>
        ))}
    </div>
  );
  
};

export default Shimmer;
