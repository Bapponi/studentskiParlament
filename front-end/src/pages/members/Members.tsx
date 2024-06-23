import React from 'react';
import Banner from '../../components/banner/Banner';
import Member from '../../components/member/Member';
import './members.css';

function Members() {

  const members: string[] = [
    'Име Презиме1',
    'Име Презиме2',
    'Име Презиме3',
    'Име Презиме4',
    'Име Презиме5',
    'Име Презиме6',
    'Име Презиме7',
    'Име Презиме8',
    'Име Презиме9',
    'Име Презиме10',
    'Име Презиме11',
    'Име Презиме12',
    'Име Презиме13',
    'Име Презиме14',
    'Име Презиме15',
    'Име Презиме16',
    'Име Презиме17',
    'Име Презиме18',
  ]

  const chunkSize = 6;
  const chunks = [];

  for (let i = 0; i < members.length; i += chunkSize) {
    chunks.push(members.slice(i, i + chunkSize));
  }

  return (
    <div>
      <Banner title='ЧЛАНОВИ' bannerImg='ztf.png'/>
      <div className='all-members'>
        <div className='main-members'>
          <Member 
            position='председник' 
            name='Име Презиме' 
            bio='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eos labore fugiat eaque facere ipsam provident! Quis distinctio expedita esse fugiat adipisci non, quas, voluptas debitis blanditiis amet asperiores? Deleniti commodi quidem suscipit asperiores qui vero ratione sed impedit animi?'
            memberImg='person.png'
          />
          <Member 
            position='под-председник' 
            name='Име Презиме' 
            bio='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eos labore fugiat eaque facere ipsam provident! Quis distinctio expedita esse fugiat adipisci non, quas, voluptas debitis blanditiis amet asperiores? Deleniti commodi quidem suscipit asperiores qui vero ratione sed impedit animi?'
            memberImg='person.png'
          />
        </div>
        <div className='other-members'>
          {chunks.map((chunk, index) => (
            <div key={index} className='other-members__column'>
              {chunk.map((member, idx) => (
                <h2 key={idx} className='other-member'>
                  <center>
                    <span style={{color: "var(--primary-color)"}}>
                      {member}
                    </span> - члан
                  </center>
                </h2>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;