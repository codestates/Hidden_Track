import { combineReducers } from 'redux';
import { INPUT_ID, INPUT_PW, USER_INFO } from '../actions/actions';
import { initialState } from './initialState';

const rootReducer = combineReducers({
  inputIdReducer,
  inputPWReducer
});

// reducer : 변화를 일으키는 함수
function inputIdReducer (state = initialState.inputId, action) {
  // state : 현재 상태, action을 전달받아 새로운 상태를 만들어서 반환함
  // 리듀서는 꼭 불변성을 지켜줘야 함
  switch (action.type) {
    case INPUT_ID:
      return Object.assign({}, state, {
        inputId: action.payload.inputId
      });
    default: return state;
  }
}

function inputPWReducer (state = initialState.inputPW, action) {
  switch (action.type) {
    case INPUT_PW:
      return Object.assign({}, state, {
        inputPW: action.payload.inputPW
      });
    default: return state;
  }
}

function userInfoReducer (state = initialState.userInfo, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        
      })
      default: return state
  }
}

export default rootReducer;
