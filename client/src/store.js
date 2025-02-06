import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import supabase from './supabaseClient.js';

// ✅ 현재 활성 상태 관리 (sessionStorage 사용)
let activeValue = sessionStorage.getItem('activeValue');

const activeSlice = createSlice({
  name: 'active',
  initialState: activeValue ? parseInt(activeValue) : 1, // 기본값 1
  reducers: {
    setActive(state, action) {
      return action.payload; // 상태를 새로운 값으로 설정
    }
  }
});

// ✅ 카테고리 추가 비동기 액션 (Supabase에 저장 후 Redux 반영)
export const addCategoryToServer = createAsyncThunk(
  'categories/addCategoryToServer',
  async ({ categoryName, userId }, { dispatch }) => {
    try {
      const response = await axios.post('http://localhost:3030/api/category', {
        categoryName,
        userId
      });

      if (response.status === 201) {
        dispatch(addCategories(categoryName)); // Redux에 추가
      }
    } catch (error) {
      console.error("카테고리 추가 실패:", error);
    }
  }
);

// ✅ 카테고리 목록 관리 (Redux + Supabase 연동)
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: ['중요', '덜중요', '하든지 말든지'],
  reducers: {
    addCategories(state, action) {
      state.push(action.payload); // 새로운 카테고리를 Redux에 추가
    },
    deleteCategories(state, action) {
      return state.filter(category => category !== action.payload); // Redux에서 카테고리 삭제
    }
  }
});

// ✅ 액션 내보내기
export const { setActive } = activeSlice.actions;
export const { addCategories, deleteCategories } = categoriesSlice.actions;

// ✅ Redux 스토어 설정
const store = configureStore({
  reducer: {
    active: activeSlice.reducer,
    categories: categoriesSlice.reducer,
  }
});

export default store;