import { createSlice } from '@reduxjs/toolkit'

export const filterValues = {
    showAll: "filterValues/showAll",
    showCompleted: "filterValues/showCompleted",
    showActive: "filterValues/showActive"
}

const visibilityFilterSlice = createSlice({
    name: "visibilityFilter",
    initialState: { filter: filterValues.showAll },
    reducers: {
        setVisibilityFilter(state, action) {
            state.filter = action.payload
        }
    },
    selectors: {
        selectFilterValue(sliceState) {
            return sliceState.filter
        }
    }
})

export default visibilityFilterSlice.reducer
export const { setVisibilityFilter } = visibilityFilterSlice.actions
export const { selectFilterValue } = visibilityFilterSlice.selectors
