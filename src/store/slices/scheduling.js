import { createSlice } from "@reduxjs/toolkit"
import { productSchedulingStorageService } from "@/services/storage"

const initialState = {
    schedulingProducts: productSchedulingStorageService.get(),
}

const SchedulingSLice = createSlice({
    name: "scheduling",
    initialState,
    reducers: {
        setSchedulingProducts(state, action) {
            state.schedulingProducts = action.payload
            productSchedulingStorageService.set(action.payload)
            return state
        },
        removeSchedulingProducts(state, action) {
            state.schedulingProducts = []
            productSchedulingStorageService.remove()
            return state
        },
    },
})

export default SchedulingSLice.reducer
export const { setSchedulingProducts, removeSchedulingProducts } = SchedulingSLice.actions
