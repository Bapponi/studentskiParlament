import { useDeletePolls } from "./useDeletePoll";
import { useFetchPolls } from "./useFetchPoll";
import { useCreateNewPoll } from "./useCreateNewPoll";

export const usePoll = () => {
    
    const {data: polls, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchPolls();
    const {deletePollQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeletePolls();
    const {createPollQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewPoll();

    async function createPoll({
          title,
          elements,
          optionValues,
        }:{
          title: string,
          elements: number[],
          optionValues: { [key: number]: string },
    }){
        await createPollQuery({title, elements, optionValues});
    }

    async function deletePoll({pollToDeleteId}:{pollToDeleteId: number}){
        await deletePollQuery({id: pollToDeleteId});
        refetch();
    }

    return {
        polls,
        isLoadingFetch,
        fetchError, 
        createPoll,
        isLoadingCreate,
        createError,
        createInfo,
        deletePoll,
        isLoadingDelete,
        deleteError,
        deleteInfo,
    }

}