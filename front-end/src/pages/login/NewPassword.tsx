import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MessageBoxTypes } from '../members/helpers';
import MessageBox from '../../components/message-box/MessageBox';
import { useUpdateMemberPassword } from '../../hooks/memberHooks/useUpdateMemberPassword';

function NewPassword() {

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const {
    updateMemberPasswordQuery: updateMemberPassword ,
    error: newPasswordError, 
    isLoading: isLoadingNewPassword, 
    info: newPasswordInfo
  } = useUpdateMemberPassword();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const newPassword = async () => {
    await updateMemberPassword({email, password1, password2, token});
    console.log(newPasswordError)
    if(newPasswordError == undefined){
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    }
  }

  return (
    <div>
      <Banner title='ПОСТАВИ НОВУ ШИФРУ' bannerImg='ztf.png'/>
      <div className='login'>
        <div className='login-part'>
          <h2>Мејл</h2>
          <TextInput 
            value={email} 
            onChange={handleEmailChange} 
            type={"text"}
            placeholder='Унеси мејл овде'
          />
        </div>
        <div className='login-part'>
          <h2>Нова шифра</h2>
          <TextInput 
            value={password1} 
            onChange={handlePassword1Change} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        <div className='login-part'>
          <h2>Понови нову шифру</h2>
          <TextInput 
            value={password2} 
            onChange={handlePassword2Change} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        <div className='login-button' onClick={newPassword}>
          <Button text='Постави'/>
        </div>
      </div>
      {newPasswordError && 
        <MessageBox text={newPasswordError} infoType={MessageBoxTypes.Error}/>
      }
      {newPasswordInfo && 
        <MessageBox text={newPasswordInfo} infoType={MessageBoxTypes.Info}/>
      }
      {isLoadingNewPassword && <MessageBox text='Постављање нове шифре...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default NewPassword;
