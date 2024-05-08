import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  appoiments: [],
  googleCalnders: []
}

export const dashboardSlicer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAppoiments: (state, action) => {
      state.appoiments = action.payload
    },
    setGoogleCalnders: (state, action) => {
      state.googleCalnders = action.payload
    },
  },
 
})

export const { setAppoiments, setGoogleCalnders } = dashboardSlicer.actions

export default dashboardSlicer.reducer