import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TotalCountState {
  value: number
}

const initialState: TotalCountState = {
  value: 0,
}

export const totalItemSlice = createSlice({
  name: 'totalItem',
  initialState,
  reducers: {
    incrementTotal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrementTotal: (state) => {
      state.value -= 1
    },
    incrementTotalByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementTotal, decrementTotal, incrementTotalByAmount } = totalItemSlice.actions

export default totalItemSlice.reducer