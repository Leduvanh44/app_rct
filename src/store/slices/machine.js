import { createSlice } from "@reduxjs/toolkit";
const machineSlice = createSlice({
    name: 'machine',
    initialState: { count: 0 },
    reducers: {
      increment: state => state.count += 1,
      decrement: state => state.count -= 1
    }
  })
  
  export const { increment, decrement } = machineSlice.actions
  export default machineSlice.reducer