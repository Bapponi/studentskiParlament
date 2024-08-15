import { useDeletePolls } from "./useDeletePoll";
import { useFetchPolls } from "./useFetchPoll";
import { useCreateNewPoll } from "./useCreateNewPoll";
import { useUpdatePollActivity } from "./useUpdatePollActivity";

export const usePoll = () => {
    
    const {data: polls, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchPolls();
    const {deletePollQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeletePolls();
    const {createPollQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewPoll();
    const {updatePollActivityQuery, error: updateActivityError, isLoading: isLoadingUpdateActivity, info: updateActivityInfo} = useUpdatePollActivity();

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

    async function updatePollActivity({
        id,
        updateActive,
      }:{
        id: number,
        updateActive: boolean,
  }){
      await updatePollActivityQuery({id, updateActive});
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
        updatePollActivity,
        isLoadingUpdateActivity,
        updateActivityError,
        updateActivityInfo,
    }

}