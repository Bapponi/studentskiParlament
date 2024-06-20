import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';

function Login() {

  const [userValue, setUserValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const sendLoginInfo = () => {
    console.log(userValue)
    console.log(passwordValue)
  }

  return (
    <div className='login-container'>
      <Banner title='УЛОГУЈ СЕ' bannerImg='ztf.png'/>
      <div className='login'>
        <div className='login-part'>
          <h2>Корисничко име</h2>
          <TextInput value={userValue} onChange={handleUserChange} type={"text"}/>
        </div>
        <div className='login-part'>
          <h2>Шифра</h2>
          <TextInput value={passwordValue} onChange={handlePasswordChange} type={"password"}/>
        </div>
        <div className='login-button' onClick={sendLoginInfo}>
          <Button text='Пошаљи'/>
        </div>
      </div>
    </div>
  );
}

export default Login;