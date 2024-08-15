import { useDeleteNews } from "./useDeleteNews";
import { useCreateNewLink } from "./useCreateNewNews";
import { useUpdateLink } from "./useUpdateNews";
import { useFetchNews } from "./useFetchNews";
import { useEffect } from "react";

export const useNews = (limit: number | undefined, offset: number | undefined) => {

  const actualLimit = limit ?? 10; 
  const actualOffset = offset ?? 0;

  const { data, error: fetchError, isLoading: isLoadingFetch, refetch: fetchNews } = useFetchNews(actualLimit, actualOffset);
  const { deleteNewsQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo } = useDeleteNews();
  const { createLinkQuery, error: createError, isLoading: isLoadingCreate, info: createInfo } = useCreateNewLink();
  const { updateLinkQuery, error: updateError, isLoading: isLoadingUpdate, info: updateInfo } = useUpdateLink();

  async function createLink({ file, website, name }: { file: undefined | null | File, website: string, name: string }) {
    await createLinkQuery({ file, website, name });
  }

  async function deleteNews({ newsToDeleteId }: { newsToDeleteId: number }) {
    await deleteNewsQuery({ id: newsToDeleteId });
  }

  async function updateLink({ file, name, website, linkToUpdateId }:
    {
      file: undefined | null | File,
      name: string,
      website: string,
      linkToUpdateId: number,
    }
  ) {
    await updateLinkQuery({ file, name, website, id: linkToUpdateId });
  }

  useEffect(()=>{
    console.log(data)
  }, [])

  return {
    data,
    isLoadingFetch,
    fetchError,
    fetchNews,
    createLink,
    isLoadingCreate,
    createError,
    createInfo,
    deleteNews,
    isLoadingDelete,
    deleteError,
    deleteInfo,
    updateLink,
    isLoadingUpdate,
    updateError,
    updateInfo,
  };
};
