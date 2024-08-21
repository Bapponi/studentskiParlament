import { MaterialProps } from "../pages/materials/helpers";

const errorToString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const fetchAllMaterialsAPI = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/material`, {
      method: 'GET',
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: MaterialProps[] = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
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
      throw new Error(errorMessage);
    }    
      const newMaterial: MaterialProps = await response.json();
      return newMaterial;
    }catch (error) {
      const errorMessage = errorToString(error);
      console.error(errorMessage);
      throw errorMessage;
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
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
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
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    } 
  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

