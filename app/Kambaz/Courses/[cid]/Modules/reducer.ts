import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";

const initialState = {
  modules: modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      const newModule = {
        ...action.payload,
        _id: new Date().getTime().toString(),
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter((m: any) => m._id !== action.payload);
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;