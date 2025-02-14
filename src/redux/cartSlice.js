import { createSlice } from '@reduxjs/toolkit'

const cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            console.log('before add action: ', action.payload)
            const { item, quantity } = action.payload
            const existingItem = state.find(i => i.item.id === item.id)

            if(existingItem) {
                existingItem.quantity += quantity
                existingItem.item.inStock -= quantity
            } else {   
                const updateditem = {...item, inStock: item.inStock - quantity}
                state.push({
                    // action.payload
                    item: updateditem,
                    quantity                
                })
            }
        },
        removeFromCart(state, action) {
            console.log('action: ', action.payload)
            const {item}  = action.payload
            // console.log("ITEMM: ", item)
            console.log("state: ", state)
            const removeItem = state.findIndex(i => i.item.id === item.id)
            if(removeItem !== -1) {
                console.log("remove item: ", removeItem)
                state.splice(removeItem, 1)
            } else {
                console.error("removeItem is null")
            }
            
        },
        clearCart(state, action) {
            return []
        }

    }
})

export default cart.reducer
export const { addToCart, removeFromCart, clearCart } = cart.actions
// export const selectCart = cart.selectSlice

export function selectCart(state) {
    return state.cart

//     const cart = selectCart(state)
//     const filterValue = selectFilterValue(state)
//     switch (filterValue) {
//         case filterValues.showCompleted:
//             return cart.filter(item => item.completed)
//         case filterValues.showActive:
//             return cart.filter(item => !item.completed)
//         default:
//             return cart
//     }
}
