import React from 'react';
import './index.scss';

function HashTag () {
  const tagList = ['사랑', '우정', '자전거 타고 싶을때 듣고싶은 노래', '가을', '겨울'];

  return (
    <section id='hashtag-section'>
      <ul className='hashtag-ul'>
        {tagList.map((el, idx) => {
          return (
            <li key={idx} className='tag'>
              <span className='tag-title'>#{el}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default HashTag;
