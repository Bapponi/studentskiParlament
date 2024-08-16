import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css';
import Button from '../../components/button/Button';
import { useParams } from 'react-router-dom';
import PopUp from '../../components/pop-up/PopUp';
import { useAuth } from '../../AuthContext';
import TextInput from '../../components/form-elements/TextInput';
import TextArea from '../../components/form-elements/TextArea';
import FileUpload from '../../components/form-elements/FileUpload';
import VideoPlayer from '../../components/video-player/VideoPlayer';
import { useOneNews } from '../../hooks/newsHooks/useOneNews';
import MessageBox from '../../components/message-box/MessageBox';
import { MessageBoxTypes } from './helpers';

enum FileType {
  Photo = 1,
  Video,
  Pdf
}

function OneNews() {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const [bannerPopUp, setBannerPopUp] = useState<boolean>(false);
  const [titlePopUp, setTitlePopUp] = useState<boolean>(false);
  const [clipPopUp, setClipPopUp] = useState<boolean>(false);
  const [sectionHeaderPopUp, setSectionHeaderPopUp] = useState<number | null>(null);
  const [sectionTextPopUp, setSectionTextPopUp] = useState<number | null>(null);
  const [sectionImagePopUp, setSectionImagePopUp] = useState<number | null>(null);
  const [sectionVideoPopUp, setSectionVideoPopUp] = useState<number | null>(null);
  const [newClip, setNewClip] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newBanner, setNewBanner] = useState<File | null>(null);
  const [sectionVideo, setSectionVideo] = useState<File | null>(null);
  const [sectionImage, setSectionImage] = useState<File | null>(null);
  const [sectionHeader, setSectionHeader] = useState<string>('');
  const [sectionText, setSectionText] = useState<string>('');
  const {data: newsDetails, isLoadingFetch, fetchError, fetchNewsDetails,
         isLoadingTitleUpdate, updateTitleError, updateTitleInfo, updateNewsTitle,
         isLoadingClipUpdate, updateClipError, updateClipInfo, updateNewsClip,
         isLoadingBannerUpdate, updateBannerError, updateBannerInfo, updateNewsBanner,
         isLoadingSectionUpdate, updateSectionError, updateSectionInfo, updateNewsSection,
  } = useOneNews(id ? parseInt(id): -1);

  useEffect(() => {
    if(newsDetails){
      setNewTitle(newsDetails.title);
      setNewClip(newsDetails.clip);
    }
  }, [newsDetails]);

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

  const handleSectionVideoChange = (file: File | null) => {
    setSectionVideo(file);
  };

  const updateSection = async (sectionId: number, content: string | File | null, type: string) => {
    updateNewsSection({sectionId, content, type})
    setSectionHeaderPopUp(null);
    setSectionTextPopUp(null);
    setSectionImagePopUp(null);
    setSectionVideoPopUp(null);    
  };

  const updateTitle = async () => {
    updateNewsTitle({title: newTitle})
    setTitlePopUp(false);
  };

  const updateClip = async () => {
    updateNewsClip({clip: newClip})
    setClipPopUp(false);
  };

  const updateBanner = async () => {
    updateNewsBanner({banner: newBanner})
    setBannerPopUp(false);
  };

  return (
    <div>
      {isAdmin &&
        <div>
          {bannerPopUp && 
            <PopUp onClose={() => { setBannerPopUp(false) }}>
              <h2>Промена банера вести</h2>
              <FileUpload
                file={newBanner}
                onFileChange={handleBannerChange}
                placeholder='Превуци слику овде, или кликни да би је изабрао'
                fileType={FileType.Photo}
              />
              <div style={{ width: '100%' }} onClick={updateBanner}>
                <Button text='Пошаљи измену'/>
              </div>
            </PopUp>
          }
          {titlePopUp && 
            <PopUp onClose={() => { setTitlePopUp(false) }}>
              <h2>Промена наслова вести</h2>
              <TextInput 
                value={newTitle} 
                onChange={handleTitleChange} 
                type={"text"}
                placeholder='Унеси нови наслов овде'
              />
              <div style={{ width: '100%' }} onClick={updateTitle}>
                <Button text='Пошаљи измену'/>
              </div>  
            </PopUp>
          }
          {clipPopUp && 
            <PopUp onClose={() => { setClipPopUp(false) }}>
              <h2>Промена исечка вести</h2>
              <TextArea
                value={newClip}
                onChange={handleClipChange}
                placeholder='Унесите нови исечак текста овде' 
              />
              <div style={{ width: '100%' }} onClick={updateClip}>
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
                <div onClick={() => { setBannerPopUp(true) }}>
                  <Button text='Промени банер вести' />
                </div>
                <div onClick={() => { setTitlePopUp(true) }}>
                  <Button text='Промени наслов вести' />
                </div>
              </div>
            }
          </div>
          <div className='one-news'>
            <h3>Објављено: <span style={{ color: "var(--primary-color)" }}>{newsDetails.date}</span></h3>
            {isAdmin && 
              <div className='one-news__admin'>
                <p>{newsDetails.clip}</p>
                <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={() => { setClipPopUp(true) }} />
              </div>
            }
            {newsDetails.newsSection.map((entry) => (
              <div key={entry.id} className='one-news__sections'>
                {entry.type === 'header' && 
                  <div className='one-news__admin'>
                    <h2 className='news-section__header'>{entry.content}</h2>
                    {isAdmin &&
                      <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={() => { setSectionHeaderPopUp(entry.id) }} />
                    }
                    {sectionHeaderPopUp === entry.id &&
                      <PopUp onClose={() => { setSectionHeaderPopUp(null) }}>
                        <h2>Промени поднаслов вести</h2>
                        <TextInput 
                          value={sectionHeader} 
                          onChange={handleSectionHeaderChange} 
                          type={"text"}
                          placeholder='Унеси нови поднаслов овде'
                        />
                        <div style={{ width: '100%' }} onClick={() => updateSection(entry.id, sectionHeader, entry.type)}>
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
                      <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={() => { setSectionTextPopUp(entry.id) }} />
                    }
                    {sectionTextPopUp === entry.id &&
                      <PopUp onClose={() => { setSectionTextPopUp(null) }}>
                        <h2>Промени текст вести</h2>
                        <TextArea
                          value={sectionText}
                          onChange={handleSectionTextChange}
                          placeholder='Унесите нови параграф текста овде' 
                        />
                        <div style={{ width: '100%' }} onClick={() => updateSection(entry.id, sectionText, entry.type)}>
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
                      <img src="../refresh.png" alt="upload" className='one-news__refresh' onClick={() => { setSectionImagePopUp(entry.id) }} />
                    }
                    {sectionImagePopUp === entry.id &&
                      <PopUp onClose={() => { setSectionImagePopUp(null) }}>
                        <h2>Промени слику вести</h2>
                        <FileUpload
                          file={sectionImage}
                          onFileChange={handleSectionImageChange}
                          placeholder='Превуци слику овде, или кликни да би је изабрао'
                          fileType={FileType.Photo}
                        />
                        <div style={{ width: '100%' }} onClick={() => updateSection(entry.id, sectionImage, entry.type)} >
                          <Button text='Пошаљи измену'/>
                        </div>
                      </PopUp>
                    }
                  </div>
                }
                {entry.type === 'video' && (
                  <div className='one-news__admin'>
                    <VideoPlayer width='63%' height='100%' src={entry.content}/>
                    {isAdmin && (
                      <img
                        src='../refresh.png'
                        alt='upload'
                        className='one-news__refresh'
                        onClick={() => setSectionVideoPopUp(entry.id)}
                      />
                    )}
                    {sectionVideoPopUp === entry.id && (
                      <PopUp onClose={() => setSectionVideoPopUp(null)}>
                        <h2>Промени видео вести</h2>
                        <FileUpload
                          file={sectionVideo}
                          onFileChange={handleSectionVideoChange}
                          placeholder='Превуци видео овде, или кликни да би га изабрао'
                          fileType={FileType.Video}
                        />
                        <div
                          style={{ width: '100%' }}
                          onClick={() =>
                            updateSection(entry.id, sectionVideo, entry.type)
                          }
                        >
                          <Button text='Пошаљи измену' />
                        </div>
                      </PopUp>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {(updateTitleInfo || updateClipInfo || updateBannerInfo || updateSectionInfo) && 
        <MessageBox text={updateTitleInfo || updateClipInfo || updateBannerInfo || updateSectionInfo} infoType={MessageBoxTypes.Info}/>
      }
      {(fetchError || updateTitleError || updateClipError || updateBannerError || updateSectionError) && 
        <MessageBox text={fetchError || updateTitleError || updateClipError || updateBannerError || updateSectionError} infoType={MessageBoxTypes.Error}/>
      }
      {isLoadingFetch && <MessageBox text='Учитава се вест...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingTitleUpdate && <MessageBox text='Мења се наслов вести...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingClipUpdate && <MessageBox text='Мења се исечак вести...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingBannerUpdate && <MessageBox text='Мења се банер вести...' infoType={MessageBoxTypes.Loading}/>}
      {isLoadingSectionUpdate && <MessageBox text='Мења се секција вести...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default OneNews;
