import { createSlice } from '@reduxjs/toolkit'
import { selectCart } from './cartSlice'
import { useSelector } from 'react-redux'

let currId = 1
const items = createSlice({
    name: "items",
    initialState: [],
    reducers: {
        setItems(state, action) {
            return action.payload
        },
        decrementStock(state, action) {
            console.log("stock: ", action.payload)
            const { item, quantity } = action.payload
            const oldItem = state.find(i => i.id === item.id)
            if(oldItem) {
                oldItem.inStock -= quantity;
            } else {
                console.error("Old item is null")
            }
        },
        incrementStock(state, action) {
            // console.log("stock: ", action.payload)
            const { item, quantity } = action.payload
            // console.log("Item: ", id)
            // console.log("quantitiy: ", quantity)

            const oldItem = state.find(i => i.id === item.id)
            if(oldItem) {
                console.log("old item: ", (oldItem.inStock))
                console.log(quantity)
                oldItem.inStock += quantity;
            } else {
                console.error("Old item is null")
            }
        }
    }
})

export default items.reducer
export const { setItems, incrementStock, decrementStock } = items.actions
// export const selectItems = items.selectSlice

export function selectItems(state) {
    return state.items

//     const items = selectItems(state)
//     const filterValue = selectFilterValue(state)
//     switch (filterValue) {
//         case filterValues.showCompleted:
//             return items.filter(item => item.completed)
//         case filterValues.showActive:
//             return items.filter(item => !item.completed)
//         default:
//             return items
//     }
}
