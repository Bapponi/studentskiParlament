import React from 'react';
import './member.css'


interface MemberProps {
  position: string;
  name: string;
  bio: string;
  memberImg: string;
}
  
const Member: React.FC<MemberProps> = ({
    position,
    name,
    bio,
    memberImg
  }) => {

  return (
    <div className='member'>
        <img src={memberImg} alt="member" className='member-image'/>
        <div>
            <h1 style={{color: "var(--primary-color)"}}>{name}</h1>
            <h2>{position}</h2>
            <p>{bio}</p>
        </div>
    </div>
  );
}

export default Member;