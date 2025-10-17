const Loader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg shadow animate-pulse p-4 space-y-4"
        >
          <div className="h-48 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
