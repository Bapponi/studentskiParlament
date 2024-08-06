import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';
import PopUp from '../../components/pop-up/PopUp';
import { useAuth } from '../../AuthContext';
import TextInput from '../../components/form-elements/TextInput';
import TextArea from '../../components/form-elements/TextArea';
import FileUpload from '../../components/form-elements/FileUpload';

interface NewsSection{
  id: number,
  type: string,
  content: string,
}

interface NewsPanelProps{
  id: number,
  title: string,
  banner: string,
  clip: string,
  date: string,
  newsSection: NewsSection[],
}

enum FileType {
  Photo = 1,
  Video,
  Pdf
}


function OneNews() {
  const { id } = useParams<{ id: string }>();
  const {isAdmin} = useAuth();
  const [newsDetails, setNewsDetails] = useState<NewsPanelProps | null>(null);
  const [bannerPopUp, setBannerPopUp] = useState<boolean>(false);
  const [titlePopUp, setTitlePopUp] = useState<boolean>(false);
  const [clipPopUp, setClipPopUp] = useState<boolean>(false);
  const [sectionHeaderPopUp, setSectionHeaderPopUp] = useState<boolean>(false);
  const [sectionTextPopUp, setSectionTextPopUp] = useState<boolean>(false);
  const [sectionImagePopUp, setSectionImagePopUp] = useState<boolean>(false);
  const [newClip, setNewClip] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBanner, setNewBanner] = useState<File | null>(null);
  const [sectionImage, setSectionImage] = useState<File | null>(null);
  const [sectionHeader, setSectionHeader] = useState<string>('');
  const [sectionText, setSectionText] = useState<string>('');

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/news/${id}`, {method: 'GET'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsDetails(data);
        setNewTitle(data.title)
        setNewClip(data.clip)
      } catch (error) {
        console.error('Error fetching news details:', error);
      }
    };

    fetchNewsDetails();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleClipChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewClip(e.target.value);
  };

  const handleBannerChange = (file: File | null) => {
    setNewBanner(file);
  };

  const handleSectionHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionHeader(e.target.value);
  };

  const handleSectionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSectionText(e.target.value);
  };

  const handleSectionImageChange = (file: File | null) => {
    setSectionImage(file);
  };

  return (
    <div>
      {isAdmin &&
        <div>
          {bannerPopUp && 
            <PopUp onClose={()=>{setBannerPopUp(false)}}>
              <h2>Промена банера вести</h2>
              <FileUpload
                file={newBanner}
                onFileChange={handleBannerChange}
                placeholder='Превуци слику овде, или кликни да би је изабрао'
                fileType={FileType.Photo}
              />
              <div style={{width:'100%'}}>
                <Button text='Пошаљи измену'/>
              </div>
            </PopUp>
          }
          {titlePopUp && 
            <PopUp onClose={()=>{setTitlePopUp(false)}}>
              <h2>Промена наслова вести</h2>
              <TextInput 
                value={newTitle} 
                onChange={handleTitleChange} 
                type={"text"}
                placeholder='Унеси нови наслов овде'
              />
              <div style={{width:'100%'}}>
                <Button text='Пошаљи измену'/>
              </div>  
            </PopUp>
          }
          {clipPopUp && 
            <PopUp onClose={()=>{setClipPopUp(false)}}>
              <h2>Промена исечка вести</h2>
              <TextArea
                value={newClip}
                onChange={handleClipChange}
                placeholder='Унесите нови исечак текста овде' 
              />
              <div style={{width:'100%'}}>
                <Button text='Пошаљи измену'/>
              </div>
            </PopUp>
          }
        </div>
      }
      
      {newsDetails && (
        <div>
          <div className='news-banner__container'>
            <Banner title={newsDetails.title} bannerImg={newsDetails.banner} />
            {isAdmin &&
              <div className='news-banner__buttons'>
                <div onClick={()=>{setBannerPopUp(true)}}>
                  <Button text='Промени банер вести'/>
                </div>
                <div onClick={()=>{setTitlePopUp(true)}}>
                  <Button text='Промени наслов вести'/>
                </div>
              </div>
            }
          </div>
          <div className='one-news'>
            <h3>Објављено: <span style={{color: "var(--primary-color)"}}>{newsDetails.date}</span></h3>
            {isAdmin && 
              <div className='one-news__admin'>
                <p>{newsDetails.clip}</p>
                <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={()=>{setClipPopUp(true)}}/>
              </div>
            }
            {newsDetails.newsSection.map((entry) => (
              <div key={entry.id} className='one-news__sections'>
                {entry.type === 'header' && 
                  <div className='one-news__admin'>
                    <h2 className='news-section__header'>{entry.content}</h2>
                    {isAdmin &&
                    <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={()=>{setSectionHeaderPopUp(true)}}/>
                    }
                    {sectionHeaderPopUp &&
                      <PopUp onClose={()=>{setSectionHeaderPopUp(false)}}>
                        <h2>Промени поднаслов вести</h2>
                        <TextInput 
                          value={entry.content} 
                          onChange={handleSectionHeaderChange} 
                          type={"text"}
                          placeholder='Унеси нови поднаслов овде'
                        />
                        <div style={{width:'100%'}}>
                          <Button text='Пошаљи измену'/>
                        </div>
                      </PopUp>
                    }
                  </div>
                }
                {entry.type === 'text' && (
                  <div className='one-news__admin'>
                    <div>
                      {entry.content.split('\n').map((line, lineIdx) => (
                        <p key={lineIdx}>{line}</p>
                      ))}
                    </div>
                    {isAdmin &&
                    <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={()=>{setSectionTextPopUp(true)}}/>
                    }
                    {sectionTextPopUp &&
                      <PopUp onClose={()=>{setSectionTextPopUp(false)}}>
                        <h2>Промени текст вести</h2>
                        <TextArea
                          value={entry.content}
                          onChange={handleSectionTextChange}
                          placeholder='Унесите нови параграф текста овде' 
                        />
                        <div style={{width:'100%'}}>
                          <Button text='Пошаљи измену'/>
                        </div>
                      </PopUp>
                    }
                  </div>  
                )}
                {entry.type === 'picture' && 
                <div className='one-news__admin'>
                  <img src={entry.content} alt={`News section ${entry.id}`} className='news-section__picture'/>
                  {isAdmin &&
                    <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={()=>{setSectionImagePopUp(true)}}/>
                  }
                  {sectionImagePopUp &&
                    <PopUp onClose={()=>{setSectionImagePopUp(false)}}>
                      <h2>Промени слику вести</h2>
                      <FileUpload
                        file={sectionImage}
                        onFileChange={handleSectionImageChange}
                        placeholder='Превуци слику овде, или кликни да би је изабрао'
                        fileType={FileType.Photo}
                      />
                      <div style={{width:'100%'}}>
                        <Button text='Пошаљи измену'/>
                      </div>
                    </PopUp>
                  }
                </div>
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OneNews;