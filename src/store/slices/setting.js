import { createSlice } from "@reduxjs/toolkit"
import { settingStorageService } from "@/services/storage"

const initialState = {
    shifts: settingStorageService.get("shifts") ?? [
        { description: "Ca sáng", startTime: "07:00:00", endTime: "12:00:00" },
        { description: "Ca chiều", startTime: "13:00:00", endTime: "18:00:00" },
    ],
    oeeDuration: settingStorageService.get("oee-duration") ?? 10,
}

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setShifts(state, action) {
            state.shifts = action.payload
            settingStorageService.set("shifts", action.payload)
            return state
        },
        setOeeDuration(state, action) {
            state.oeeDuration = action.payload
            settingStorageService.set("oee-duration", action.payload)
            return state
        },
    },
})

export default settingSlice.reducer
export const { setShifts, setOeeDuration } = settingSlice.actions
