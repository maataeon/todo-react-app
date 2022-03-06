import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';


const defaultTasks = [{
  id: 0,
  groupId: 0,
  done: false,
  title: 'Example Task',
  description: 'example description',
}];

const defaultGroups = [{
  id: 0,
  name: 'default',
  color: '#333333',
}];

const defaultState = {
  modalOpen: false,
  selectedGroupId: 0,
  tasks: [...defaultTasks],
  groups: [...defaultGroups]
}


const STORAGE_KEY = 'todoState';


export const getStorageData = createAsyncThunk(
  'todo/getStorageData',
  async () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState != null) {
      return JSON.parse(savedState);
    } else {
      return { ...defaultState };
    }
  }
);


const todoSlice = createSlice({
  name: 'todo',
  initialState: { ...defaultState },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
      console.log(state.tasks)
      saveState(state);
    },
    addGroup(state, action) {
      state.groups.push(action.payload);
      saveState(state);
    },
    closeModal(state) {
      if (state.modalOpen) {
        state.modalOpen = false;
      }
    },
    clearAll(state) {
      state.modalOpen = false;
      state.selectedGroupId = 0;
      state.tasks = [...defaultTasks];
      state.groups = [...defaultGroups];
      console.log(state.tasks);
      saveState(state);
    },
    clearTasks(state) {
      state.tasks = [];
      saveState(state);
    },
    openModal(state, action) {
      if (!state.modalOpen) {
        state.modalOpen = true;
        state.modalChild = action.payload
      }
    },
    removeGroup(state, action) {
      state.groups = state.groups.filter(group => group.id !== action.payload);
      state.selectedGroupId = 0;
      saveState(state);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveState(state);
    },
    setSelectedGroupId(state, action) {
      state.selectedGroupId = action.payload;
    },
    toggleTask(state, action) {
      const task = state.tasks.find(task => task.id === action.payload.id);
      task.done = action.payload.status;
      saveState(current(state));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getStorageData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.tasks = action.payload.tasks;
      state.groups = action.payload.groups;
      console.log(state.tasks)
    })
  }
});

const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}


export const { addTask, addGroup, clearAll, clearTasks, closeModal, openModal, removeGroup, removeTask, setSelectedGroupId, toggleTask } = todoSlice.actions;

export default todoSlice.reducer;