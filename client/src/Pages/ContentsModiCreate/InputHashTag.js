import React, { useState } from 'react';
import './inputHashTag.scss';

function InputHashTag ({ tagList, handleInputValue, handleNotice }) {
  // 태그 삭제 함수
  const removeTags = (indexToRemove, e) => {
    // console.log(tagList)
    const deleteTags = tagList.filter((el, i) => {
      return i !== indexToRemove;
    });
    handleInputValue('deleteTag', e, deleteTags);
  };

  // 글자수 제한 유효성 검사 함수
  function isValidLength (e) {
    e.preventDefault();
    // console.log('유효성 검사 함수',inputText.length)
    if (e.target.value.length > 20) {
      handleNotice('태그는 20자를 초과할 수 없습니다.', 5000);
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
          isValidLength(e);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            if (e.target.value !== '') {
              if (tagList.length >= 5) {
                handleNotice('HashTag는 5개까지 추가 가능합니다.', 5000);
              } else {
                handleInputValue('tag', e);
                e.target.value = null;
              }
            } else {
              e.target.value = null;
            }
          }
        }}
      />
      <ul className='hashtag-ul'>
        {tagList.map((el, idx) => {
          return (
            <li key={idx} className='tag'>
              <span className='tag-title'>#{el}</span>
              <span className='tag-close-icon' onClick={(e) => removeTags(idx, e)}>&times;</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default InputHashTag;
