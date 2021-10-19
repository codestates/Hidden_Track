import React from 'react';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';
import Footer from '../../Components/Footer';
import './index.scss';

function Main () {
 
  // useEffect(() => {
  //   // let abortController = new AbortController()
  //   axios.get(`${process.env.REACT_APP_API_URL}/track/charts/all`, { headers: { accesstoken: accessToken } })
  //     .then(res => {
  //       console.log('메인 all',res.data)
  //       setLatestChart(res.data.latestchart);
  //       setPopularityChart(res.data.popularchart);
  //       setRecommendChart(res.data.recommendchart);
  //       setTagList(res.data.hashtags);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  // }, []);

  return (
    <>
      <div id='main'>
        <div className='main-slides'>
          <Slide />
          <Recommend />
        </div>
        <div className='main-genre'>
          <span className='main-genre-title sign-two'>G&#32;E&#32;N&#32;R&#32;E</span>
          <Genre />
        </div>
        <div className='main-hashtag'>
          <span className='main-hashtag-title sign-three'>H&#32;A&#32;S&#32;H&#32;T&#32;A&#32;G&#32;S</span>
          <HashTag />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
