import React from 'react';
import './index.scss';

function HashTag () {
  const tagList = ['#사랑', '우정', '자전거 타고 싶을때 듣고싶은 용기', 'ㄹㅇㄴㅁㄻ', '라라라', 'fdsafsda', 'fdsfsadfas', 'fdsafsdafasd', 'fdsfsdafsd', 'fdsafdsfsa', 'fdsafsdafsda', 'fdsafsdaf', 'fdsafdsfsdaf', 'fdsafsdafsadf', 'fdsafsdafsadfas', 'fdsafsdafsda', 'fdsfsadfsdafasd', 'fdsafdsafsdafasdf', 'fdsafdsafsdaf', 'fdsafsdfsdafdsf'];

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
