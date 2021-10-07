import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackDetails, isLoadingHandler, getAccessToken } from '../../Redux/actions/actions';
import axios from 'axios';
import Genre from '../../Components/Genre/';
// import HashTag from '../../Components/HashTag';
import TrackList from './TrackList';
import './index.scss';

function SearchTrack ({ handleNotice }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = useSelector(state => state.accessTokenReducer);
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    // 새로고침시 pathname의 검색값 불러와서 다시 요청
    getSearchContents();
  }, [location.pathname]);

  const genre = location?.state?.genre;
  const hashTag = location?.state?.hashTag;
  const search = location?.state?.search;

  // 검색 페이지에 랜더링될 목록 요청하는 함수
  function getSearchContents () {
    console.log('dfgdfgdfgdfgdfdf', location.state);

    if (!genre && !hashTag && !search) return setTrackList([]);
    dispatch(isLoadingHandler(true));

    // -------------장르 선택시 장르 목록 요청------------
    if (genre) {
      console.log(genre);
      axios.get(`${process.env.REACT_APP_API_URL}/track/genre/${genre}`)
        .then(res => {
          console.log('장르 선택 요청 응답', res.data);
          if (res.status === 200) setTrackList(res.data.track);
          else setTrackList([]);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            if (err.response.status === 404) setTrackList([]);
          } else console.log(err);
        });
    }
    // ------------해시태그 검색시 요청--------------
    else if (hashTag) {
      console.log(hashTag);
      axios.get(`${process.env.REACT_APP_API_URL}/track/hashtag/${hashTag}`)
        .then(res => {
          console.log('해시태그 선택 요청 응답', res.data);
          if (res.status === 200) setTrackList(res.data.track);
          else setTrackList([]);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            if (err.response.status === 404) setTrackList([]);
            if (err.response.status === 400) setTrackList([]);
          } else console.log(err);
        });
    }
    // --------------검색어 입력시 요청----------------
    else {
      axios.get(`${process.env.REACT_APP_API_URL}/search?query=${search}`)
        .then(res => {
          console.log('검색어 요청 응답', res.data);
          if (res.status === 200) setTrackList(res.data);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            if (err.response.status === 400) {
              setTrackList([]);
            }
            if (err.response.status === 414) {
              handleNotice('검색어는 30자 이내로 입력해주세요.', 5000);
              setTrackList([]);
            }
          } else console.log(err);
        });
    }
    dispatch(isLoadingHandler(false));
  }

  return (
    <div className='searchtrack-container'>
      <Genre genre={genre} />
      {/* <div className='hashtag-box'>
        <HashTag tagList={[]} searchTag={hashTag} />
      </div> */}
      <p className='searchtrack-msg'>{genre || hashTag || search}(으)로 검색한 결과</p>
      <TrackList
        trackList={trackList}
        dispatch={dispatch}
        getTrackDetails={getTrackDetails}
        handleNotice={handleNotice}
        search={search}
        hashTag={hashTag}
        accessToken={accessToken}
      />
    </div>
  );
}

export default SearchTrack;
