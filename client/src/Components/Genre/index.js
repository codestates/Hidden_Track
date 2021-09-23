import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './index.scss';

function Genre () {
  const genreList = ['Jazz', 'HipHop', 'Rock', 'Ballad', 'R&B'];
  const [selectGenre, setSelectGenre] = useState('');
  const history = useHistory();

  useEffect(() => {
    const genre = localStorage.getItem('search').slice(1);
    if (genreList.includes(genre)) {
      setSelectGenre(genre);
    }
  }, [localStorage.getItem('search')]);

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
    <section className='genre-container'>
      <h2 className='a11yHidden'>장르</h2>
      <div className='genre-box'>
        {genreList.map((el, idx) => {
          return (
            <span className={selectGenre === el ? 'genre-image selected-genre' : 'genre-image'} value={el} key={idx} onClick={(e) => clickGenre(e)}>
              <p className={selectGenre === el ? 'genre-name selected-genre' : 'genre-name'} value={el} onClick={(e) => clickGenre(e)}>
                {el}
              </p>
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default Genre;
