import { useDeleteNews } from "./useDeleteNews";
import { useUpdateNewsTitle } from "./useUpdateNewsTitle";
import { useEffect } from "react";
import { useFetchOneNews } from "./useFetchOneNews";
import { useUpdateNewsClip } from "./useUpdateNewsClip";
import { useUpdateNewsBanner } from "./useUpdateNewsBanner";
import { useUpdateNewsSection } from "./useUpdateNewsSection";

export const useOneNews = (id: number) => {

  const { data, error: fetchError, isLoading: isLoadingFetch, refetch: fetchNewsDetails } = useFetchOneNews(id);
  const { deleteNewsQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo } = useDeleteNews();
  const { updateNewsTitleQuery, error: updateTitleError, isLoading: isLoadingTitleUpdate, info: updateTitleInfo } = useUpdateNewsTitle();
  const { updateNewsClipQuery, error: updateClipError, isLoading: isLoadingClipUpdate, info: updateClipInfo } = useUpdateNewsClip();
  const { updateNewsBannerQuery, error: updateBannerError, isLoading: isLoadingBannerUpdate, info: updateBannerInfo } = useUpdateNewsBanner();
  const { updateNewsSectionQuery, error: updateSectionError, isLoading: isLoadingSectionUpdate, info: updateSectionInfo } = useUpdateNewsSection();

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

  async function updateNewsSection({
    sectionId,
    content,
    type,
  }:{
    sectionId: number,
    content: string | File | null,
    type: string,
  }) {
    await updateNewsSectionQuery({ id, sectionId, content, type });
    fetchNewsDetails();
  }

  return {
    data,
    isLoadingFetch,
    fetchError,
    fetchNewsDetails,
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
    updateNewsSection,
    isLoadingSectionUpdate,
    updateSectionError,
    updateSectionInfo,
  };
};
