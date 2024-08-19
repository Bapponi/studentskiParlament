import React, { useEffect, useState } from 'react';
import './admin-panel.css';
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import CreatePoll from '../../components/polls/CreatePoll';
import Polls from '../../components/polls/Polls';
import { useFetchMemberName } from '../../hooks/memberHooks/useFetchMemberName';
import MessageBox from '../../components/message-box/MessageBox';
import { MessageBoxTypes } from '../members/helpers';


function AdminPanel() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();
  const [pollsVisible, setPollsVisible] = useState<boolean>(true);
  const [createPollsVisible, setCreatePollsVisible] = useState<boolean>(false);
  const [createNewsVisible, setCreateNewsVisible] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const { data: memberName, error: nameError, isLoading: isLoadingName } = useFetchMemberName(userId ? parseInt(userId) : -1);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  const selectUserActivity = (option: number) => {
    switch (option) {
      case 1:
        setPollsVisible(true);
        setCreatePollsVisible(false);
        setCreateNewsVisible(false);
        break;
      case 2:
        setPollsVisible(false);
        setCreatePollsVisible(true);
        setCreateNewsVisible(false);
        break;
      case 3:
        setPollsVisible(false);
        setCreatePollsVisible(false);
        setCreateNewsVisible(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {isAdmin ? (
        <Banner title={memberName + " АДМИН"} bannerImg="ztf.png" />
      ) : (
        <Banner title={memberName + " ЧЛАН"} bannerImg="ztf.png" />
      )}
      <div className="admin-panel">
        {isAdmin && (
          <div className="user-buttons">
            <div onClick={() => selectUserActivity(1)} className='user-button'>
              <Button text="Преглед свих гласања" active={pollsVisible} />
            </div>
            <div onClick={() => selectUserActivity(2)} className='user-button'>
              <Button text="Прављење новог гласања" active={createPollsVisible} />
            </div>
            <div onClick={() => selectUserActivity(3)} className='user-button'>
              <Button text="Прављење нових вести" active={createNewsVisible} />
            </div>
          </div>
        )}
        {pollsVisible && <Polls />}
        {createPollsVisible && isAdmin && <CreatePoll />}
        {createNewsVisible && isAdmin && <CreateNews />}
      </div>
      {nameError && 
        <MessageBox text={nameError} infoType={MessageBoxTypes.Error}/>
      }
      {isLoadingName && 
        <MessageBox text='Учитава се име корисника...' infoType={MessageBoxTypes.Loading}/>
      }
    </div>
  );
}

export default AdminPanel;
