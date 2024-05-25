import { createSlice } from '@reduxjs/toolkit'

export interface TotalCountState {
  value:  boolean // this is a boolean value that will be used to check if the payment is successfull 
}

const initialState: TotalCountState = {
  value:false,
}

export const paymentStatusSlice = createSlice({
  name: 'paymentStatus',
  initialState,
  reducers: {
    activePaymentStatus: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
        state.value = true
    },
    inActivePaymentStatus: (state) => {
        state.value = false
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { activePaymentStatus, inActivePaymentStatus } = paymentStatusSlice.actions

export default paymentStatusSlice.reducer