import React, { useEffect, useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import CreatePoll from '../../components/polls/CreatePoll';
import Polls from '../../components/polls/Polls';

function AdminPanel() {

  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
  const [pollsVisible, setPollsVisible] = useState<boolean>(true)
  const [createPollsVisible, setCreatePollsVisible] = useState<boolean>(false)
  const [createNewsVisible, setCreateNewsVisible] = useState<boolean>(false)

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
  }, []);

  const selectUserActivity = (option: number) => {
    console.log("aaaaaa: " + option)
    switch(option){
      case 1:{
        setPollsVisible(true)
        setCreatePollsVisible(false)
        setCreateNewsVisible(false)
        break
      }case 2:{
        setPollsVisible(false)
        setCreatePollsVisible(true)
        setCreateNewsVisible(false)
        break
      }case 3:{
        setPollsVisible(false)
        setCreatePollsVisible(false)
        setCreateNewsVisible(true)
        break
      }
    }
  }

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <div className='admin-panel'>
        <div className='user-buttons'>
          <div onClick={()=>{selectUserActivity(1)}}>
            <Button text='Преглед гласања' />
          </div>
          <div onClick={()=>{selectUserActivity(2)}}>
            <Button text='Прављење новог гласања' />
          </div>
          <div onClick={()=>{selectUserActivity(3)}}>
            <Button text='Прављење нових вести' />
          </div>
        </div>
        {pollsVisible && <Polls/>}
        {createPollsVisible && <CreatePoll/>}
        {createNewsVisible && <CreateNews/>}
      </div>
    </div>
  );
}

export default AdminPanel;