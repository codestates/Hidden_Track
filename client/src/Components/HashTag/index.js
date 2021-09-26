import React from 'react';
import { useHistory } from 'react-router';
import './index.scss';

function HashTag () {
  const tagList = ['사랑', '우정', '자전거 타고 싶을때 듣고싶은 노래', '가을', '겨울'];
  const history = useHistory();

  // 해시태그 클릭시 실행되는 함수
  function clickHashTag (e) {
    e.preventDefault();
    // console.log(e.target.getAttribute('value'))
    // console.log(e.target.parentElement.getAttribute('value'))
    const hashTag = e.target.getAttribute('value') || e.target.parentElement.getAttribute('value');
    history.push({
      pathname: `/searchtrack/${hashTag}`,
      state: {
        hashTag: hashTag
      }
    });
  }
  if( tagList === undefined ){
    
  }
  return (
    <section id='hashtag-section'>
      <ul className='hashtag-ul'>
        {tagList.map((el, idx) => {
          return (
            <li key={idx} className='tag' value={el}>
              <span className='tag-title' value={el} onClick={(e) => clickHashTag(e)}>#{el}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default HashTag;
