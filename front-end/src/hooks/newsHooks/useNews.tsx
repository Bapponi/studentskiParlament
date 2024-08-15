import { useDeleteLinks } from "./useDeleteNews";
import { useCreateNewLink } from "./useCreateNewNews";
import { useUpdateLink } from "./useUpdateNews"
import { useFetchNews } from "./useFetchNews";

export const useNews = (limit: number, offset: number) => {

    const { data, error: fetchError, isLoading: isLoadingFetch, refetch: fetchNews } = useFetchNews(limit, offset);
    const {deleteLinkQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeleteLinks();
    const {createLinkQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewLink();
    const {updateLinkQuery, error: updateError, isLoading: isLoadingUpdate, info: updateInfo} = useUpdateLink();

    async function createLink({file, website, name}:{file: undefined | null | File, website: string, name: string}){
        await createLinkQuery({file, website, name});
        fetchNews();
    }

    async function deleteLink({linkToDeleteId}:{linkToDeleteId: number}){
        await deleteLinkQuery({id: linkToDeleteId});
        fetchNews();
    }

    async function updateLink({file, name, website, linkToUpdateId}:
        {
            file: undefined | null | File, 
            name: string,
            website: string, 
            linkToUpdateId: number,
        }
    ){
        await updateLinkQuery({file, name, website, id: linkToUpdateId});
        fetchNews();
    }

    return {
        data,
        isLoadingFetch,
        fetchError,
        fetchNews,
        createLink,
        isLoadingCreate,
        createError,
        createInfo,
        deleteLink,
        isLoadingDelete,
        deleteError,
        deleteInfo,
        updateLink,
        isLoadingUpdate,
        updateError,
        updateInfo,
    }

}