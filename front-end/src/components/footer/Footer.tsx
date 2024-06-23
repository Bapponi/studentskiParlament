import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className='footer'>
      <img src="etf-logo.png" alt="etf-logo" style={{height: "70px"}}/>
      <div className='contact'>
        <h4>Булевар Краља Александра 73</h4>
        <h4>11000 Београд - Србија</h4>
        <h4>Е-пошта: info@parlament.etf.rs</h4>
      </div>
    </div>
  );
}

export default Footer;