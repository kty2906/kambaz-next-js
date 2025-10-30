import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { Module } from "../../../Database/types";

// Define extended module type with editing property
interface ModuleWithEditing extends Module {
  editing?: boolean;
}

const initialState = {
  modules: modules as ModuleWithEditing[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // CREATE NEW MODULE
    addModule: (state, action) => {
      const newModule: ModuleWithEditing = {  
        _id: new Date().getTime().toString(),
        name: action.payload.name,
        course: action.payload.course,
        description: "",
        lessons: [],
        editing: false,
      };
      state.modules = [...state.modules, newModule];
    },
    
    // DELETE MODULE
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (m: ModuleWithEditing) => m._id !== action.payload 
      );
    },
    
    // UPDATE MODULE (for editing name)
    updateModule: (state, action) => {
      state.modules = state.modules.map((m: ModuleWithEditing) =>  
        m._id === action.payload._id ? action.payload : m
      );
    },
    
    // SET EDITING MODE
    editModule: (state, action) => {
      state.modules = state.modules.map((m: ModuleWithEditing) =>
        m._id === action.payload ? { ...m, editing: true } : { ...m, editing: false }
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } = 
  modulesSlice.actions;
export default modulesSlice.reducer;