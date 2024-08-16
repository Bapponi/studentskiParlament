import { useDeleteNews } from "./useDeleteNews";
import { useCreateNewNews } from "./useCreateNewNews";
import { useFetchNews } from "./useFetchNews";
import { useEffect } from "react";

export const useNews = (limit: number | undefined, offset: number | undefined) => {

  const actualLimit = limit ?? 10; 
  const actualOffset = offset ?? 0;

  const { data, error: fetchError, isLoading: isLoadingFetch, refetch: fetchNews } = useFetchNews(actualLimit, actualOffset);
  const { deleteNewsQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo } = useDeleteNews();
  const { createNewsQuery, error: createError, isLoading: isLoadingCreate, info: createInfo } = useCreateNewNews();

  async function createNews({
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
  }){
    await createNewsQuery({banner, title, clip, elements, headerValues, textValues, uploadedPictures, uploadedVideos});
  }

  async function deleteNews({ newsToDeleteId }: { newsToDeleteId: number }) {
    await deleteNewsQuery({ id: newsToDeleteId });
  }

  return {
    data,
    isLoadingFetch,
    fetchError,
    fetchNews,
    createNews,
    isLoadingCreate,
    createError,
    createInfo,
    deleteNews,
    isLoadingDelete,
    deleteError,
    deleteInfo,
  };
};
