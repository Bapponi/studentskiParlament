import { useDeleteLinks } from "./useDeleteLink";
import { useFetchLinks } from "./useFetchLink";
import { useCreateNewLink } from "./useCreateNewLink";
import { useUpdateLink } from "./useUpdateLink"

export const useLinks = () => {
    
    const {data: links, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchLinks();
    const {deleteLinkQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeleteLinks();
    const {createLinkQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewLink();
    const {updateLinkQuery, error: updateError, isLoading: isLoadingUpdate, info: updateInfo} = useUpdateLink();

    async function createLink({file, website, name}:{file: undefined | null | File, website: string, name: string}){
        await createLinkQuery({file, website, name});
        refetch();
    }

    async function deleteLink({linkToDeleteId}:{linkToDeleteId: number}){
        await deleteLinkQuery({id: linkToDeleteId});
        refetch();
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
        refetch();
    }

    return {
        links,
        isLoadingFetch,
        fetchError, 
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