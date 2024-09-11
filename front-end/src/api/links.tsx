import { LinkProps } from "../pages/links/helpers";

const errorToString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const fetchAllLinksAPI = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/link`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: LinkProps[] = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  } 
};

export const createLinkAPI = async ({
    file,
    website,
    name,
}:{
    file: undefined | File | null,
    website: string,
    name: string,
}) => {
  try {

    if (!file) {
      throw new Error("Молим Вас да унесете лого")      
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('website', website);
    formData.append('name', name);
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/link/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }    
      const newLink: LinkProps = await response.json();
      return newLink;

  }catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

export const deleteLinkAPI = async ({
  id,
}:{
  id: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/link/${id}`, {
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

export const updateLinkAPI = async ({
  file,
  name,
  website,
  id
}:{
  file: undefined | File | null,
  name: string,
  website: string,
  id: number
}) => {
  try {

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('website', website);
    formData.append('name', name);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/link/${id}`, {
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

