import React from 'react';
import { useHistory } from 'react-router';
import './index.scss';

function HashTag ({ tagList1 }) {
  const tagList = [{ tag: '가을' }, { tag: '우울할때듣는곡' }, { tag: '설렘' }, { tag: '드라이브' }, { tag: '감미로운' }, { tag: '인디' }, { tag: '랩' }, { tag: '흑인음악' }, { tag: '카페' }, { tag: '10' }, { tag: '11' }, { tag: '12사' }, { tag: '13' }, { tag: '14사432랑' }, { tag: '15사랑' }, { tag: '16사' }, { tag: '17사랑' }, { tag: '18사' }, { tag: '19' }, { tag: '2' }];
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

  console.log(tagList);

  return (
    <section id='hashtag-section'>
      <ul className='hashtag-ul'>
        {tagList
          ? tagList.map((el, idx) => {
            return (
              <li key={idx} className='tag' value={el.tag}>
                <span className='tag-title' value={el.tag} onClick={(e) => clickHashTag(e)}>#{el.tag}</span>
              </li>
            );
          })
          : <></>}
      </ul>
    </section>
  );
}

export default HashTag;
