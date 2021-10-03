import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './index.scss';

function Genre () {
  const genreList = ['Jazz', 'HipHop', 'Rock', 'Ballad', 'R&B'];
  const [selectGenre, setSelectGenre] = useState('');
  const history = useHistory();

  // 장르 선택시 실행되는 함수
  function clickGenre (e) {
    console.log(e.target.getAttribute('value'));
    const genre = e.target.getAttribute('value');
    setSelectGenre(genre);
    // 검색 페이지로 이동
    history.push({
      pathname: `/searchtrack/${genre}`,
      state: {
        genre: genre
      }
    });
  }

  return (
    <section className='genre-container'>
      <h2 className='a11yHidden'>장르</h2>
      <div className='genre-box'>
        {genreList.map((el, idx) => {
          return (
            <span className={selectGenre === el ? 'genre-bg selected-genre-bg' : 'genre-bg'} value={el} key={idx} onClick={(e) => clickGenre(e)}>
              <p className={selectGenre === el ? 'genre-name selected-genre-name' : 'genre-name'} value={el} onClick={(e) => clickGenre(e)}>
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
