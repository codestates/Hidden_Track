import React, {useState} from 'react';

function Test () {

  const [obj, setObj] = useState({id: '', pw: ''})
  
  function change(key, value){
    // console.log(obj.id);
    // const result1 = {...obj, key: value}
    // console.log(result1);
  
    // const result2 = {...obj, [key]: value}
    // console.log(result2);
    console.log(value);
    console.log(obj);
    console.log({...obj, [key]: value});
    // setObj({...obj, [key]: value})
  }
  console.log(obj);
  // console.log(obj);
  return (
    <span onClick={(e) =>change('pw', '오잉')}>
     버튼
    </span>
  );
}

export default Test;
