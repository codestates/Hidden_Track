export const initialState = {
  isLogin: {
    isLogin: false
  },
  userInfo: {
    id: '',
    loginId: '',
    profile: '',
    nickName: '',
    admin: 'listener',
    // 만약 admin이 'artist'라면 아래 정보도 받음
    userArtist: {
      agency: '',
      email: '',
      debut: ''
    }
  }
};
