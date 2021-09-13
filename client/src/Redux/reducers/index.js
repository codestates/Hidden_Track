import { combineReducers } from 'redux';
import { USER_INFO, IS_LOGIN } from '../actions/actions';
import { initialState } from './initialState';

const rootReducer = combineReducers({
  isLoginReducer,
  userInfoReducer
});

// reducer : 변화를 일으키는 함수
function isLoginReducer (state = initialState.isLogin, action) {
  // state : 현재 상태, action을 전달받아 새로운 상태를 만들어서 반환함
  // 리듀서는 꼭 불변성을 지켜줘야 함
  switch (action.type) {
    case IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.payload.isLogin
      });
    default: return state;
  }
}

function userInfoReducer (state = initialState.userInfo, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.payload.userInfo
      });
    default: return state;
  }
}

export default rootReducer;
