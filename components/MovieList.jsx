import React, { useState } from 'react';
import Pagination from './Pagination';

const MovieList = ({ movies, totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    onPageChange(selected + 1); // Convert to 1-based index
  };

  return (
    <>
    <div className="grid grid-cols-2 gap-x-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-28">
      {movies.length > 0 && movies.map((movie) => (
        <div className="card-wrapper xl:h-full sm:h-80">
            <a key={movie._id} href={`pages/movie/${movie._id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                  src={movie.image}
                  className="max-h-96 w-full object-cover object-center group-hover:opacity-75 sm:max-h-60sm"
                  />
              </div>
              <p className="mt-4 text-xl text-white capitalize">{movie.title}</p>
              <p className="mt-2 text-sm text-white font-medium">{movie.year}</p>
            </a>
        </div>
      ))}
    </div>
    <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </>
  );
};

export default MovieList;