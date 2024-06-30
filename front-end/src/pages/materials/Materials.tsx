import React from 'react';
import Banner from '../../components/banner/Banner';
import './materials.css'
import Material from '../../components/material/Material';
import FileUpload from '../../components/form-elements/FileUpload';
import TextInput from '../../components/form-elements/TextInput';
import Button from '../../components/button/Button';

interface MaterialProps {
  documentLink: string;
  title: string;
}

const materials: MaterialProps[] = [
  {
    documentLink: './documents/pravilnik_studentskog_parlamenta.pdf',
    title: 'Правилник студентског парламента'
  },
  {
    documentLink: './documents/poslovnik_studentskog_parlamenta.pdf',
    title: 'Пословник студентског парламента'
  },
  {
    documentLink: './documents/pravilnik_o_odrzavanju_izbora_za_studentski_parlament.pdf',
    title: 'Правилник о одржавању избора за студентски парламент'
  },
  {
    documentLink: './documents/pravilnik_o_predlaganju_i_pravima_i_obavezama_studenta_prodekana.pdf',
    title: 'Правилник о предлагању и правима и обавезама студента продекана'
  },
  {
    documentLink: './documents/biografija.pdf',
    title: 'Биографија предложеног кандидата за студента продекана'
  }
]

function Materials() {

  // const [links, setLinks] = useState<LinkProps[]>([]);
  // const [file, setFile] = useState<File | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [website, setWebsite] = useState<string>('');
  // const [name, setName] = useState<string>('');

  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/link');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data: LinkProps[] = await response.json();
  //       setLinks(data);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       } else {
  //         setError('An unknown error occurred');
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchLinks();
  // }, []);

  // const handleFileChange = (file: File | null) => {
  //   setFile(file);
  // };

  // const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setWebsite(e.target.value);
  // };

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  // const upload = async () => {
  //   if (!file) {
  //     setError("Молим Вас да унесете лого")
  //     return;
  //   }
  //   setError(null)

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('website', website);
  //   formData.append('name', name);

  //   try {
  //     const response = await fetch('http://localhost:8000/link/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       setError(await response.text())
  //       throw new Error(await response.text());
  //     }else{
  //       const newLink: LinkProps = await response.json();
  //       setLinks((prevLinks) => [...prevLinks, newLink]);
  //       setError(null)
  //       setFile(null)
  //       setName("")
  //       setWebsite("")
  //     }
      
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  // const handleDelete = (id: number) => {
  //   setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error && isLoading) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <Banner title='МАТЕРИЈАЛИ' bannerImg='ztf.png'/>
      <div className='materials'>
        {materials.map((entry, index) => (
          <Material 
            key={index}
            documentLink={entry.documentLink} 
            title={entry.title}/>
        ))}
      </div>
      <div className='create-link'>
        <h2>Креирај нови материјал</h2>
        {/* <FileUpload 
          file={file} 
          onFileChange={handleFileChange} 
          placeholder='Превуци лого овде, или кликни да би га изабрао'
          fileType={FileType.Photo}
        /> */}
        {/* <input type="file" onChange={handleFileChange} /> */}
        {/* <TextInput 
          value={website} 
          onChange={handleWebsiteChange} 
          type={"text"} 
          placeholder='Унеси линк овде типа https://...'
        /> */}
        {/* <TextInput 
          value={name} 
          onChange={handleNameChange} 
          type={"text"}
          placeholder='Унеси назив фајла'
        /> */}
        {/* <div onClick={upload} style={{width: "100%"}}> */}
          <Button text='Додај'/>
        {/* </div> */}
        {/* {error && <h4 style={{color: "var(--primary-color)"}}>{error}</h4>} */}
      </div>
    </div>
  );
}

export default Materials;