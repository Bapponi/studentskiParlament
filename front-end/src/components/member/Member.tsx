import React from 'react';
import './member.css'


interface MemberProps {
  position: string;
  name: string;
  bio: string;
  memberImg: string;
  roleId: number;
  onDelete: (id: number) => void;
}
  
const Member: React.FC<MemberProps> = ({
    position,
    name,
    bio,
    memberImg,
    roleId,
    onDelete,
  }) => {

  return (
    <div>
        {roleId == 1 && (
          <div className='member'>
            <img src={memberImg} alt="member" className='member-image'/>
            <div>
                <h1 style={{color: "var(--primary-color)"}}>{name}</h1>
                <h2>{position}</h2>
                <p>{bio}</p>
            </div>
          </div>
        )}
        {roleId == 3 && (
          <div>
            <h2 className='other-member'>
              <center>
                <span style={{color: "var(--primary-color)"}}>
                  {name}
                </span> - {position}
              </center>
            </h2>
          </div>
        )}
    </div>
  );
}

export default Member;