import React from 'react';
import Banner from '../../components/banner/Banner';
import './materials.css'
import Material from '../../components/material/Material';

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
  return (
    <div>
      <Banner title='МАТЕРИЈАЛИ' bannerImg='ztf.png'/>
      <div className='materials'>
        {materials.map((entry) => (
          <Material documentLink={entry.documentLink} title={entry.title}/>
        ))}
      </div>
    </div>
  );
}

export default Materials;