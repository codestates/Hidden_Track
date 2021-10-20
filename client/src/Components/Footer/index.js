import React from 'react';
import './index.scss';
import githubIcon from '../../assets/github.png';

function Footer () {
  return (
    <footer className='footer'>
      {/* <address class="address">
        <span>서울시 마포구 상수동 123-12 한주빌딩 5층</span>
        <span>전화: <a class="address__telephone" href="tel:022345678">02-234-5678</a></span>
        <span>이메일:
          <a class="address__link" href="mailto:seulbinim@gmail.com?subject=문의사항">seulbinim@gmail.com</a></span>
      </address> */}
      <div className='footer__developer-box'>
        <p>Develop by</p>
        <div className='footer__developer'>
          <a href='https://github.com/Realroot'>
            <img className='githubIcon' src={githubIcon} alt='githubIcon' />
            <span className='developer'>이윤근</span>
          </a>
          <a href='https://github.com/James940522'>
            <img className='githubIcon' src={githubIcon} alt='githubIcon' />
            <span className='developer'>정재민</span>
          </a>
          <a href='https://github.com/Achates09'>
            <img className='githubIcon' src={githubIcon} alt='githubIcon' />
            <span className='developer'>위석량</span>
          </a>
          <a href='https://github.com/jjub0217'>
            <img className='githubIcon' src={githubIcon} alt='githubIcon' />
            <span className='developer'>강주현</span>
          </a>
        </div>
      </div>
      <small className='copyright'>
        Copyright since &copy; 2021 by cordonramsay of Code State CORPORATION ALL RIGHTS RESERVED.
      </small>
    </footer>
  );
}

export default Footer;
