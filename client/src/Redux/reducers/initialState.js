export const initialState = {
  isLogin: {
    isLogin: false
  },
  isLoginModalOpen: {
    isLoginModalOpen: false
  },
  accessToken: {
    accessToken: ''
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
  },
  isLoading: {
    isLoading: false
  },

  trackDetail: {
    track: {
      id: '',
      title: '',
      img: '',
      genre: '',
      soundtrack: '',
      releaseAt: '',
      lyric: '',
      user: {
        nickName: ''
      },
      hashtags: [],
      replies: []
    },
    like: '',
    gradeAev: '',
    myLike: false
  },

  playList: []
};
