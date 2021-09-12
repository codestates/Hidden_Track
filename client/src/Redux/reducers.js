import { INPUT_ID } from './actions';

const initialStateInputId = {
  // inputId 상태의 초기값 설정
  inputId: ''
};
// reducer : 변화를 일으키는 함수
export default function inputIdReducer (state = initialStateInputId, action) {
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
