import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './reducers/movieSlice'
import personSlice from './reducers/personSlice'
import tvSlice from './reducers/tvSlice'

export const store = configureStore({
  reducer: {
    person: personSlice,
    movie: movieSlice,
    tv: tvSlice,
  },
})