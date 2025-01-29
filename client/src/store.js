import { configureStore, createSlice } from '@reduxjs/toolkit';

// sessionStorage에서 값 가져오기
let activeValue = sessionStorage.getItem('activeValue');

// createSlice로 슬라이스 정의
const activeSlice = createSlice({
  name: 'active',
  initialState: activeValue ? parseInt(activeValue) : 1, // 기본값 1
  reducers: {
    setActive(state, action) {
      return action.payload; // 상태를 새로운 값으로 설정
    }
  }
});

const categories = createSlice({
  name: 'categories',
  initialState: ['중요','덜중요','하든지 말든지'],
  reducers: {
    addCategories(state, action) {
      return state.push(action.payload); // 상태를 새로운 값으로 설정
    },
    deleteCategories(state, action){
      return state.filter( categories => categories !== action.payload)
    }
  }
});


// 액션 내보내기
export const { setActive } = activeSlice.actions;
export const { addCategories,deleteCategories } = categories.actions;

// 스토어 설정
const store = configureStore({
  reducer: {
    active: activeSlice.reducer,
    categories: categories.reducer,
  },
});

export default store; // 기본 내보내기