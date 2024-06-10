import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className='footer'>
      <img src="etf-logo.png" alt="etf-logo" style={{height: "70px"}}/>
      <div>
        <a href='https://www.linkedin.com/in/aleksandarbubalo/' target='blank' className='linkedin'>
          <h4>Александар Бубало</h4>
          <img src="linkedin.png" alt="etf-logo" style={{height: "1rem"}}/>
        </a>
        <h4>Сва права задржана 2024</h4>
      </div>
    </div>
  );
}

export default Footer;