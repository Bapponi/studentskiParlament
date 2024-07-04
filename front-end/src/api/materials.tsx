import { MaterialProps } from "../pages/materials/helpers";

export const fetchAllMaterials = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material`);
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
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material/upload`, {
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

export const deleteMaterialAPI = async ({
  id,
}:{
  id: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Неуспешно избрисан линк!');
    }

    return id;
  } catch (error) {
    console.error('Грешка приликом брисанја линка:', error);
  }
};

export const updateMaterialAPI = async ({
  newFile,
  newTitle,
  id
}:{
  newFile: undefined | File | null,
  newTitle: string,
  id: number
}) => {
  try {

    const formData = new FormData();
    if (newFile) {
      formData.append('file', newFile);
    }
    formData.append('title', newTitle);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Неуспешно ажуриран линк!');
    } else {
      const updatedMaterial = await response.json();
      // setCurrentTitle(updatedMaterial.title);
      // setCurrentDocumentLink(updatedMaterial.documentLink);
    }

    // setIsPopupVisible(false);
  } catch (error) {
    console.error('Грешка приликом ажурирања линка:', error);
  }
};
