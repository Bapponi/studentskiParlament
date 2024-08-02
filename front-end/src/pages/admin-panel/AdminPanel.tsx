import React, { useEffect, useState } from 'react';
import './admin-panel.css';
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import CreatePoll from '../../components/polls/CreatePoll';
import Polls from '../../components/polls/Polls';


function AdminPanel() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();
  const [pollsVisible, setPollsVisible] = useState<boolean>(true);
  const [createPollsVisible, setCreatePollsVisible] = useState<boolean>(false);
  const [createNewsVisible, setCreateNewsVisible] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const [memberName, setMemberName] = useState<string>('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      getMember();
    }
  }, []);

  const getMember = async () => {
    try {
      const response = await fetch(`http://localhost:8000/member/name/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMemberName(data);
    } catch (error) {
      console.error(error);
    }
  };

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
            <div onClick={() => selectUserActivity(1)}>
              <Button text="Преглед свих гласања" active={pollsVisible} />
            </div>
            <div onClick={() => selectUserActivity(2)}>
              <Button text="Прављење новог гласања" active={createPollsVisible} />
            </div>
            <div onClick={() => selectUserActivity(3)}>
              <Button text="Прављење нових вести" active={createNewsVisible} />
            </div>
          </div>
        )}
        {pollsVisible && <Polls />}
        {createPollsVisible && isAdmin && <CreatePoll />}
        {createNewsVisible && isAdmin && <CreateNews />}
      </div>
    </div>
  );
}

export default AdminPanel;
