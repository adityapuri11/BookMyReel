import React from 'react'
import BlurCircle from '../components/BlurCircle'
import MovieCard from '../components/MovieCard'
import { useAppContext } from '../context/AppContext'

const Movies = ({ searchTerm }) => {
  const { shows } = useAppContext()

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return filteredShows.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-40 overflow-hidden min-h-[80vh]'>
      <BlurCircle top="150px" left='0px' />
      <BlurCircle bottom="150px" right='0px' />
      <h1 className='text-lg font-medium my-4'>Now Showing</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {filteredShows.map(movie => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No movies found</h1>
    </div>
  )
}

export default Movies
