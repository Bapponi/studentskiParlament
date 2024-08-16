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
    banner,
    title,
    clip,
    elements,
    headerValues,
    textValues,
    uploadedPictures,
    uploadedVideos,
}:{
    banner: File | null,
    title: string,
    clip: string,
    elements: number[],
    headerValues: { [key: number]: string },
    textValues: { [key: number]: string },
    uploadedPictures: { [key: number]: File | null },
    uploadedVideos: { [key: number]: File | null },
}) => {
  try {

    const formData = new FormData();

    if (banner) {
      formData.append('banner', banner);
    }

    formData.append('title', title);
    formData.append('clip', clip);
    formData.append('elements', JSON.stringify(elements));
    formData.append('headerValues', JSON.stringify(headerValues));
    formData.append('textValues', JSON.stringify(textValues));

    Object.entries(uploadedPictures).forEach(([key, file]) => {
      if (file) {
        formData.append('uploadedFileKeys', key);
        formData.append('uploadedFiles', file);
      }
    });

    Object.entries(uploadedVideos).forEach(([key, file]) => {
      if (file) {
        formData.append('uploadedVideoKeys', key);
        formData.append('uploadedVideo', file);
      }
    });
  
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

export const fetchOneNewsAPI = async ({
  id,
}:{
  id: number,
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/news/${id}`, { method: 'GET' });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    const errorMessage = errorToString(error);
    console.error(errorMessage);
    throw errorMessage;
  }
};

