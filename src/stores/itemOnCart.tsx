import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface itemOncCartState {
  id: number,
  name: string,
  image: string,
  amount: number,
  stock: number,
  price: number,
  totolprice: number,

}

const initialState: itemOncCartState[] = []


export const itemOnCartSlice = createSlice({
  name: 'itemOnCart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value += 1
      if (action.payload === undefined) return


      if (state.find((item) => item.id === action.payload.id)) {
        const item = state.find((item) => item.id === action.payload.id)
        if (item) {
          item.amount += 1
        }

      } else {
        state.push(action.payload)
      }


    },
    removeItemOncart: (state, action) => {

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.splice(action.payload, 1)

      // state.value -= 1
    },
    // incrementTotalByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    changeAmount: (state, action: PayloadAction<{ id: number, amount: number }>) => {
      const item = state.find((item) => item.id === action.payload.id)
      if (item) {
        item.amount = action.payload.amount
      }
    },


    removeAllItem: (state) => { 
      state.splice(0, state.length)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemOncart, changeAmount ,removeAllItem } = itemOnCartSlice.actions

export default itemOnCartSlice.reducer