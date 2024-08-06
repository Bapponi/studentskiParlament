import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

function NewPassword() {

  const [emailValue, setEmailValue] = useState('');
  const [password1Value, setPassword1Value] = useState('');
  const [password2Value, setPassword2Value] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1Value(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2Value(e.target.value);
  };

  const newPassword = async () => {
    try {
        console.log(emailValue, password1Value, password2Value)
      const response = await fetch('http://localhost:8000/member/newPassword/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password1: password1Value,
          password2: password2Value,
        }),
      });

      if (!response.ok) {
        throw new Error('Неуспешна постављена нова шифра');
      }

      const data = await response.json();
      navigate('/login');

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }

  return (
    <div>
      <Banner title='ПОСТАВИ НОВУ ШИФРУ' bannerImg='ztf.png'/>
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
          <h2>Нова шифра</h2>
          <TextInput 
            value={password1Value} 
            onChange={handlePassword1Change} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        <div className='login-part'>
          <h2>Понови нову шифру</h2>
          <TextInput 
            value={password2Value} 
            onChange={handlePassword2Change} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className='login-button' onClick={newPassword}>
          <Button text='Постави'/>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
