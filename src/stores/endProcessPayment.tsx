import { createSlice } from '@reduxjs/toolkit'

export interface TotalCountState {
  value:  boolean // this is a boolean value that will be used to check if the payment is successfull 
}

const initialState: TotalCountState = {
  value:false,
}

export const endProcessPaymentSlice = createSlice({
  name: 'paymentStatus',
  initialState,
  reducers: {
    endProcessPayment: (state , actions) => {
    console.log("🚀 ~ state:", state?.value)
    console.log("🚀 ~ actions:", actions)
 
        state.value =  actions.payload
    },
    // inActivePaymentStatus: (state) => {
    //     state.value = false
    // },

  
    
   
  },
})

// Action creators are generated for each case reducer function
export const { endProcessPayment  } = endProcessPaymentSlice.actions

export default endProcessPaymentSlice.reducer