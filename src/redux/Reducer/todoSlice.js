import {createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todo: [],
    completedTodo: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todo = [...state.todo, action.payload];
      // return {...state, todo: [...state.todo, action.payload]};
    },
    deleteTodo: (state = initialState, action) => {
      let newTODOS = [...state.todo];
      const index = state.todo.findIndex((td) => td.id === action.payload.id);
      if (index >= 0) {
        newTODOS.splice(index, 1);
      } else {
        console.warn('Cant do this');
      }
      return {...state, todo: newTODOS};
    },
    todoDone: (state, action) => {
      state.completedTodo = [...state.completedTodo, action.payload];
    },
    removeDoneTodo: (state = initialState, action) => {
      let newTODOS = [...state.completedTodo];
      const index = state.completedTodo.findIndex(
        (td) => td.id === action.payload.id,
      );
      if (index >= 0) {
        newTODOS.splice(index, 1);
      } else {
        console.warn('Cant do this');
      }
      return {...state, completedTodo: newTODOS};
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  todoDone,
  removeDoneTodo,
} = todoSlice.actions;

export const selectTodo = (state) => state.todo.todo;
export const selectDoneTodo = (state) => state.todo.completedTodo;

export default todoSlice.reducer;
