import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './reducers/movieSlice'
import peopleSlice from './reducers/peopleSlice'
import tvSlice from './reducers/tvSlice'

export const store = configureStore({
  reducer: {
    people: peopleSlice,
    movie: movieSlice,
    tv: tvSlice,
  },
})