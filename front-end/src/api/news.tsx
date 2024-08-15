import { NewsProps, NewsResponse } from "../pages/news/helpers";

const errorToString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const fetchAllNewsAPI = async ({
  limit,
  newsLength,
}:{
  limit: number,
  newsLength: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news?limit=${limit}&offset=${newsLength}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data: NewsResponse = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  } 
};

export const createNewsAPI = async ({
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
      throw new Error("Молим Вас да унесете фајл")      
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('website', website);
    formData.append('name', name);
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }    
      const newNews: NewsProps = await response.json();
      return newNews;

  }catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

export const deleteNewsAPI = async ({
  id,
}:{
  id: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news/${id}`, {
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

export const updateNewsAPI = async ({
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

    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news/${id}`, {
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

