import { combineReducers } from 'redux';
import {
  USER_INFO,
  IS_LOGIN,
  IS_LOGIN_MODAL_OPEN,
  INPUT_PLAYLIST,
  TRACK_DETAIL,
  INPUT_MUSIC,
  DELETE_MUSIC,
  ACCESS_TOKEN,
  // CLICK_MODIFY,
  IS_LOADING
  // TRACK_LIST
} from '../actions/actions';
import { initialState } from './initialState';

const rootReducer = combineReducers({
  isLoginReducer,
  isLoginModalOpenReducer,
  userInfoReducer,
  playListReducer,
  trackDetailReducer,
  accessTokenReducer,
  // modifyReducer,
  loadingIndicatorReducer
  // trackListReducer
});

// reducer : 변화를 일으키는 함수
function isLoginReducer (state = initialState.isLogin, action) {
  // state : 현재 상태, action을 전달받아 새로운 상태를 만들어서 반환함
  // 리듀서는 꼭 불변성을 지켜줘야 함
  switch (action.type) {
    case IS_LOGIN:
      return Object.assign({}, {
        isLogin: action.payload.isLogin
      });
    default: return state;
  }
}

function isLoginModalOpenReducer (state = initialState.isLoginModalOpen, action) {
  switch (action.type) {
    case IS_LOGIN_MODAL_OPEN:
      return Object.assign({}, {
        isLoginModalOpen: action.payload.isLoginModalOpen
      });
    default: return state;
  }
}

function userInfoReducer (state = initialState.userInfo, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, action.payload.userInfo);
    default: return state;
  }
}

function playListReducer (state = initialState, action) {
  switch (action.type) {
    case INPUT_PLAYLIST:
      return Object.assign({}, state, {
        playList: [...action.payload.playList]
      });

    case INPUT_MUSIC:
      return Object.assign({}, state, {
        playList: [...state.playList, action.payload.playList]
      });

    case DELETE_MUSIC:
      return Object.assign({}, state, {
        playList: state.playList.filter(el => el.id !== action.payload.playList.id)
      });
    default: return state;
  }
}

function trackDetailReducer (state = initialState.trackDetail, action) {
  switch (action.type) {
    case TRACK_DETAIL:
      return Object.assign({}, action.payload.trackDetail);
    default: return state;
  }
}

function accessTokenReducer (state = initialState.accessToken, action) {
  switch (action.type) {
    case ACCESS_TOKEN:
      return Object.assign({}, {
        accessToken: action.payload.accessToken
      });
    default: return state;
  }
}

// function modifyReducer (state = initialState.onClickModify, action) {
//   switch (action.type) {
//     case CLICK_MODIFY:
//       return Object.assign({}, {
//         onClickModify: action.payload.onClickModify
//       });
//     default: return state;
//   }
// }

function loadingIndicatorReducer (state = initialState.isLoading, action) {
  switch (action.type) {
    case IS_LOADING:
      return Object.assign({}, {
        isLoading: action.payload.isLoading
      });
    default: return state;
  }
}

// function trackListReducer (state = initialState.trackList, action) {
//   switch (action.type) {
//     case TRACK_LIST:
//       return Object.assign({}, {
//         trackList: action.payload.trackList
//       });
//     default: return state;
//   }
// }

export default rootReducer;
