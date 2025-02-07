import { configureStore, createReducer } from '@reduxjs/toolkit'

import itemsReducer from './itemsSlice'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartReducer
    }
})

store.subscribe(() => {
    console.log("== store:", store.getState())
})

export default store
