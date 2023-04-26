import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Name',
        brand: 'Brand',
        flavor: 'Flavor',
        size: 'Size',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseBrand: (state, action) => { state.brand = action.payload},
        chooseFlavor: (state, action) => { state.flavor = action.payload},
        chooseSize: (state, action) => { state.size = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseBrand, chooseFlavor, chooseSize } = rootSlice.actions;

// A reducer is like an event listener that handles the events based on the kind of event it receives