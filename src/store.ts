import { configureStore } from '@reduxjs/toolkit'
import   totalItemSlice  from './stores/totalItem'
import   itemOnCartSlice  from './stores/itemOnCart'
import   paymentStatusSlice  from './stores/payMentStatus'
import endProcessPayment from './stores/endProcessPayment'
import paymentTopUpSlice   from './stores/paymentTopup'

export const store = configureStore({
    reducer: {
        totalItem: totalItemSlice,
        itemOnCart : itemOnCartSlice,
        paymentStatus: paymentStatusSlice,
        endProcessPayment: endProcessPayment,
        paymentTopUp : paymentTopUpSlice

    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch