import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Login() {

  const [userValue, setUserValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth()

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(e.target.value);
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
          username: userValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Неуспешно пријављивање');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userRole', data.userRole);

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
    <div className='login-container'>
      <Banner title='УЛОГУЈ СЕ' bannerImg='ztf.png'/>
      <div className='login'>
        <div className='login-part'>
          <h2>Корисничко име</h2>
          <TextInput 
            value={userValue} 
            onChange={handleUserChange} 
            type={"text"}
            placeholder='Унеси корисничко име овде'
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
      </div>
    </div>
  );
}

export default Login;
