import React, { useState } from 'react';
import './inputHashTag.scss';

function InputHashTag ({ tagList, handleInputValue, handleNotice, duplicateCheck }) {
  // 특수문자 정규식 변수(공백 미포함)
  const replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>0-9\/.\`:\"\\,\[\]?|{}]/gi;

  // 완성형 아닌 한글 정규식
  const replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;

  // 태그 삭제 함수
  const removeTags = (indexToRemove, e) => {
    // console.log(tagList)
    const deleteTags = tagList.filter((el, i) => {
      return i !== indexToRemove;
    });
    handleInputValue('deleteTag', e, deleteTags);
  };

  // 글자수 제한 유효성 검사 함수
  function isValidTag (e) {
    e.preventDefault();
    // console.log('유효성 검사 함수',inputText.length)
    if (e.target.value.length > 10) {
      handleNotice('해시태그는 10자를 초과할 수 없습니다.', 5000);
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    }
    if (e.target.value.match(' ')) {
      handleNotice('해시태그에 공백은 사용 불가능합니다.', 5000);
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    }
  }

  // setInputText(inputText.slice(0, 7));
  return (
    <div id='input-hashtag-section'>
      <input
        className='hashtag-input'
        type='text'
        placeholder='HashTag 추가시 Enter를 눌러주세요'
        // style={{ width: '200px' }}
        onChange={(e) => {
          isValidTag(e);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            if (e.target.value !== '') {
              if (!tagList.includes(e.target.value)) {
                if (tagList.length >= 5) {
                  handleNotice('HashTag는 5개까지 추가 가능합니다.', 5000);
                } else {
                  if (e.target.value.match(replaceNotFullKorean)) {
                    handleNotice('한글은 완성형으로 작성해주세요', 5000);
                  } else if (e.target.value.match(replaceChar)) {
                    handleNotice('특수문자는 사용이 불가능합니다.', 5000);
                  } else {
                    handleInputValue('tag', e);
                    e.target.value = null;
                  }
                }
              } else {
                handleNotice('HashTag가 중복되었습니다.', 5000);
              }
            } else {
              e.target.value = null;
            }
          }
        }}
      />
      <ul className='hashtag-ul'>
        {tagList
          ? tagList.map((el, idx) => {
            return (
              <li key={idx} className='tag'>
                <span className='tag-title'>#{el}</span>
                <span className='tag-close-icon' onClick={(e) => removeTags(idx, e)}>&times;</span>
              </li>
            );
          })
          : <></>}
      </ul>
    </div>
  );
}

export default InputHashTag;
