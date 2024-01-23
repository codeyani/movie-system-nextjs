"use client";

import { Button } from "@components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@components/Pagination";
import MovieList from "@components/MovieList";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch(`/api/user/${session?.user.id}/movies?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
        });
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {movies.length === 0 ? (
        <>
          <div className="mb-4">
            <h2 className="text-white">Your Movie list is empty</h2>
          </div>
          <div className="mb-4">
            <Button 
              onClick={() => router.push("/pages/movie/create")}
              className="mt-10"
            >Add new movie </Button>
          </div>
        </>
      ) : (
        <div>
          {/* Render your movie list here */}
          {

            <div className="mx-auto max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-2">
              <div className="flex">
                <h2 className="text-white">
                  My movies 
                </h2>
                <div className="p-4">
                  <a onClick={() => router.push("/pages/movie/create")} className="flex items-center text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <g clip-path="url(#clip0_3_196)">
                        <path d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_3_196">
                          <rect width="32" height="32" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <MovieList movies={movies} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default Dashboard;