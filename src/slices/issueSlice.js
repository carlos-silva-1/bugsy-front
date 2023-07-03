import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issueInfo: localStorage.getItem('issueInfo')
    ? JSON.parse(localStorage.getItem('issueInfo'))
    : null,
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    setCurrentIssue: (state, action) => {
      state.issueInfo = action.payload;
      localStorage.setItem('issueInfo', JSON.stringify(action.payload));
    },
    removeCurrentIssue: (state, action) => {
      state.issueInfo = null;
      localStorage.removeItem('issueInfo');
    },
  },
});

export const { setCurrentIssue, removeCurrentIssue } = issueSlice.actions;

export default issueSlice.reducer;
