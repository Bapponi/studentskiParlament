import { MaterialProps } from "../pages/materials/helpers";

export const fetchAllMaterialsAPI = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material`);
    if (!response.ok) {
      throw new Error('');
    }

    const data: MaterialProps[] = await response.json();
    return data;

  } catch (error) {
    throw new Error(`${error}`);
  } 
};

export const createMaterialAPI = async ({
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
      throw new Error(``);
    }    
      const newMaterial: MaterialProps = await response.json();
      return newMaterial;
    }catch (error) {
      throw new Error(`${error}`);
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
      throw new Error('Неуспешно избрисан материјал!');
    }

  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const updateMaterialAPI = async ({
  file,
  title,
  id
}:{
  file: undefined | File | null,
  title: string,
  id: number
}) => {
  try {

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Неуспешно ажуриран материјал!');
    } 
  } catch (error) {
    throw new Error(`${error}`);
  }
};

