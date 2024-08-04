import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import PopUp from '../../components/pop-up/PopUp';

function Login() {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {setIsLoggedIn, isAdmin, setIsAdmin} = useAuth()
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(true)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const sendLoginInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Неуспешно пријављивање');
      }

      const data = await response.json();

      //ukoliko se loguje drugi clan bez odjavljivanja
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('roleId');

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userRole', data.userRole);

      if(data.userRole == 1 ){
        setIsAdmin(true)
      }
      setIsLoggedIn(true)
      navigate('/');

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      { isPopUpVisible &&
        <PopUp onClose={()=>{setIsPopUpVisible(false)}}>
          <p></p>
        </PopUp>
      }
      <Banner title='УЛОГУЈ СЕ' bannerImg='ztf.png'/>
      <div className='login'>
        <div className='login-part'>
          <h2>Мејл</h2>
          <TextInput 
            value={emailValue} 
            onChange={handleEmailChange} 
            type={"text"}
            placeholder='Унеси мејл овде'
          />
        </div>
        <div className='login-part'>
          <h2>Шифра</h2>
          <TextInput 
            value={passwordValue} 
            onChange={handlePasswordChange} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className='login-button' onClick={sendLoginInfo}>
          <Button text='Пошаљи'/>
        </div>
        <h3>Želite li da postavite novu šifru?</h3>
      </div>
    </div>
  );
}

export default Login;
