export const USER_INFO = 'USER_INFO';
export const IS_LOGIN = 'IS_LOGIN';

export function changeUserInfo (userInfo) {
  return {
    type: USER_INFO,
    payload: {
      ...userInfo
    }
  };
}

export function isLogin (boolean) {
  return {
    type: IS_LOGIN,
    payload: {
      isLogin: boolean
    }
  };
}
