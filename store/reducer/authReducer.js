import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: {}
}

export const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
    setUserMetadata: (state, action) => {
      state.user = {
        user: {
          ...state.user.user,
          user_metadata: action.payload
        }, 
        session: state.user.session}
    },
  },
  // extraReducers:(builder) => {
  //   builder.addCase(signOutUser.fulfilled, (state, action) => {
  //     if(action.payload.success == '0'){
  //       state.details = {}
  //       state.isLogged = false
  //     }
  //   })

  //   builder.addCase(sessionStatus.fulfilled, (state, action) => {
  //     if(action.payload.success == '0'){
  //       state.details = action.payload
  //       state.isLogged = true
  //     }else{
  //       state.details = {}
  //       state.isLogged = false
  //       action.payload?.router?.replace('/')
  //     }
  //   })
  // }
})

export const { setAuthUser, setUserMetadata } = authSlicer.actions

export default authSlicer.reducer