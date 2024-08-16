import { useDeleteNews } from "./useDeleteNews";
import { useCreateNewNews } from "./useCreateNewNews";
import { useUpdateNewsTitle } from "./useUpdateNewsTitle";
import { useEffect } from "react";
import { useFetchOneNews } from "./useFetchOneNews";
import { useUpdateNewsClip } from "./useUpdateNewsClip";
import { useUpdateNewsBanner } from "./useUpdateNewsBanner";

export const useOneNews = (id: number) => {

  const { data, error: fetchError, isLoading: isLoadingFetch, refetch: fetchNewsDetails } = useFetchOneNews(id);
  const { deleteNewsQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo } = useDeleteNews();
  const { createNewsQuery, error: createError, isLoading: isLoadingCreate, info: createInfo } = useCreateNewNews();
  const { updateNewsTitleQuery, error: updateTitleError, isLoading: isLoadingTitleUpdate, info: updateTitleInfo } = useUpdateNewsTitle();
  const { updateNewsClipQuery, error: updateClipError, isLoading: isLoadingClipUpdate, info: updateClipInfo } = useUpdateNewsClip();
  const { updateNewsBannerQuery, error: updateBannerError, isLoading: isLoadingBannerUpdate, info: updateBannerInfo } = useUpdateNewsBanner();

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

  async function updateNewsTitle({
      title 
    }:{
      title: string,
    }) {
    await updateNewsTitleQuery({ id, title });
    fetchNewsDetails();
  }

  async function updateNewsClip({
      clip 
  }:{
      clip: string,
  }) {
    await updateNewsClipQuery({ id, clip });
    fetchNewsDetails();
  }

  async function updateNewsBanner({
      banner 
  }:{
    banner: File | null,
  }) {
    await updateNewsBannerQuery({ id, banner });
    fetchNewsDetails();
  }

  return {
    data,
    isLoadingFetch,
    fetchError,
    fetchNewsDetails,
    createNews,
    isLoadingCreate,
    createError,
    createInfo,
    deleteNews,
    isLoadingDelete,
    deleteError,
    deleteInfo,
    updateNewsTitle,
    isLoadingTitleUpdate,
    updateTitleError,
    updateTitleInfo,
    updateNewsClip,
    isLoadingClipUpdate,
    updateClipError,
    updateClipInfo,
    updateNewsBanner,
    isLoadingBannerUpdate,
    updateBannerError,
    updateBannerInfo,
  };
};
