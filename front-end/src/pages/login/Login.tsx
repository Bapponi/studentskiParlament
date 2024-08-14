import React, { useState } from 'react';
import './login.css'
import Banner from '../../components/banner/Banner';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import PopUp from '../../components/pop-up/PopUp';
import MessageBox from '../../components/message-box/MessageBox';
import { MessageBoxTypes } from '../members/helpers';
import { usePostLoginInfo } from '../../hooks/memberHooks/usePostLoginInfo';
import { useSendConfirmationMail } from '../../hooks/memberHooks/useSendConfirmationMail';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setIsLoggedIn, isAdmin, setIsAdmin} = useAuth()
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false)
  const {
    postLoginInfoQuery: postLoginInfo, 
    memberRole, 
    error: loginError, 
    isLoading: isLoadingLogin, 
    info: loginInfo 
  } = usePostLoginInfo();
  const {
    sendConfirmationMailQuery: sendConfirmationMail, 
    error: resetError, 
    isLoading: isLoadingReset, 
    info: resetInfo
  } = useSendConfirmationMail();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const sendLoginInfo = async () => {
    await postLoginInfo({email, password});

    if(loginError == undefined){
      if(memberRole == 1 ){
        setIsAdmin(true)
      }
      setIsLoggedIn(true)
      setTimeout(() => {
        navigate("/")
      }, 3000);
    }
  };

  const resetPassword = async () => {
    setIsPopUpVisible(false)
    await sendConfirmationMail({email})
  }

  return (
    <div>
      { isPopUpVisible &&
        <PopUp onClose={()=>{setIsPopUpVisible(false)}}>
          <div className='new-password__panel'>
            <h2>Постављање нове шифре</h2>
            <p>
              Унесите ваш мејл и биће Вам послати линк за унос нове лозинке
            </p>
            <TextInput 
              value={email} 
              onChange={handleEmailChange} 
              type={"text"}
              placeholder='Унеси мејл овде'
            />
            <div onClick={resetPassword}>
              <Button text='Пошаљите захтев'></Button>
            </div>
          </div>
        </PopUp>
      }
      <Banner title='УЛОГУЈ СЕ' bannerImg='ztf.png'/>
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
          <h2>Шифра</h2>
          <TextInput 
            value={password} 
            onChange={handlePasswordChange} 
            type={"password"}
            placeholder='Унеси шифру овде'
          />
        </div>
        <div className='login-button' onClick={sendLoginInfo}>
          <Button text='Пошаљи'/>
        </div>
        <h3 className='new-password__label' onClick={()=>{setIsPopUpVisible(true)}}>Желите ли да поставите нову шифру?</h3>
      </div>
      {(loginError || resetError) && 
        <MessageBox text={loginError || resetError} infoType={MessageBoxTypes.Error}/>
      }
      {(loginInfo || resetInfo) && 
        <MessageBox text={loginInfo || resetInfo} infoType={MessageBoxTypes.Info}/>
      }
      {isLoadingLogin && <MessageBox text='Слање информација за пријаву...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingReset && <MessageBox text='Шаље се мејл за потврду...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default Login;
