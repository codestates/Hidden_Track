import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getTrackList } from '../../Redux/actions/actions';
import axios from 'axios';
import Genre from '../../Components/Genre/';
import TrackList from './TrackList';

function SearchTrack ({ handleNotice }) {
  // const trackList = useSelector(state => state.trackListReducer);
  // const dispatch = useDispatch()
  const [trackList, setTrackList] = useState([{
    id: 1,
    img: 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/Traffic_light.jpg',
    title: '신호등',
    userid: 1,
    user: {
      nickname: '이무진'
    }
  },
  {
    id: 2,
    img: 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/Sweet_Dreams.jpg',
    title: 'Sweet Dreams',
    userid: 2,
    user: {
      nickname: 'Eurythmics'
    }
  },
  {
    id: 3,
    img: 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/wind.jpg',
    title: '바람이나 좀 쐐',
    userid: 3,
    user: {
      nickname: '개리'
    }
  }]);

  useEffect(() => {
    // 새로고침시 로컬 스토리지의 검색값 불러와서 다시 요청
    getSearchContents();
  }, [localStorage.getItem('search')]);

  function handleTrackList (trackList) {
    setTrackList(trackList);
  }

  // 검색 페이지에 랜더링될 목록 요청하는 함수
  function getSearchContents () {
    const search = localStorage.getItem('search');

    // -------------장르 선택시 장르 목록 요청------------
    if (search[0] === '@') {
      axios.get(`${process.env.REACT_APP_API_URL}/post/genre`, {
        params: {
          genre: search.slice(1)
        }
      })
        .then(res => {
          console.log('장르 선택 요청 응답', res.data);
          if (res.status === 200) {
            setTrackList(res.data.track);
          } else {
            setTrackList([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // ------------해시태그 검색시 요청--------------
    else if (search[0] === '#') {
      axios.get(`${process.env.REACT_APP_API_URL}/post/hashtag`, {
        params: {
          tag: search.slice(1)
        }
      })
        .then(res => {
          console.log('해시태그 선택 요청 응답', res.data);
          if (res.status === 200) {
            setTrackList(res.data.track);
          } else {
            setTrackList([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // --------------검색어 입력시 요청----------------
    else {
      axios.get(`${process.env.REACT_APP_API_URL}/post/search`, {
        params: {
          query: search
        }
      })
        .then(res => {
          console.log('검색어 요청 응답', res.data);
          if (res.status === 200) {
            setTrackList(res.data.track);
          } else {
            setTrackList([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div>
        <Genre />
      </div>
      <div>
        해시태그 컴포넌트
      </div>
      <p>{localStorage.getItem('search')}(으)로 검색한 결과</p>
      <div>
        <TrackList trackList={trackList} handleTrackList={handleTrackList} handleNotice={handleNotice} />
      </div>
    </div>
  );
}

export default SearchTrack;
