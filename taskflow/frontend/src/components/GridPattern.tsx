const GridPattern = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-0 w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gray-100" />
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full translate-x-1/3 translate-y-1/3 bg-gray-100" />
    <div className="absolute top-1/4 right-10 w-20 h-20 border-2 border-gray-200 rounded-lg rotate-12" />
    <div className="absolute bottom-1/4 left-10 w-16 h-16 border-2 border-gray-200 rounded-full" />
  </div>
);

export default GridPattern;