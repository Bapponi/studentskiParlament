import { MaterialProps } from "../pages/materials/helpers";

export const fetchAllMaterials = async () => {
    try {
      const response = await fetch('http://localhost:8000/material');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: MaterialProps[] = await response.json();
      return data;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred whlie fetching materials.');
      }
    } 
};


export const uploadMaterial = async ({
    file,
    title,
}:{
    file: undefined | File | null,
    title: string,
}) => {
    try {
        if (!file) {
            throw new Error("Молим Вас да унесете фајл")      
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
    
      const response = await fetch('http://localhost:8000/material/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to upload data: ${errorMessage}`);
      }    
        const newMaterial: MaterialProps = await response.json();
        return newMaterial;
      }catch (error) {
        throw new Error(`An unknown error occurred whlie uploadin materials: ${error}`);
    }
  };

