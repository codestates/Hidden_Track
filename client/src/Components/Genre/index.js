import React from 'react';
import { useHistory } from 'react-router';
import './index.scss';

function Genre () {
  const genreList = ['Jazz', 'Hip Hop', 'Rock', 'Ballad', 'R&B'];
  const history = useHistory();

  // 장르 선택시 실행되는 함수
  function clickGenre (e) {
    console.log(e.target.getAttribute('value'));
    // 로컬 스토리지에 선택한 장르명 저장
    const genre = e.target.getAttribute('value');
    localStorage.setItem('search', `@${genre}`);
    // console.log(localStorage.getItem('search'))
    // 검색 페이지로 이동
    history.push('/searchtrack');
  }

  return (
    <section>
      {genreList.map((el, idx) => {
        return (
          <span className='genre-name' value={el} key={idx} onClick={(e) => clickGenre(e)}>
            {el}
          </span>
        );
      })}
    </section>
  );
}

export default Genre;
