import { useDeletePolls } from "./useDeletePoll";
import { useFetchPolls } from "./useFetchPoll";
import { useCreateNewPoll } from "./useCreateNewPoll";
import { useUpdatePollActivity } from "./useUpdatePollActivity";
import { useSendPollVote } from "./useSendPollVote";

export const usePoll = (userId: number) => {
    
    const {data: polls, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchPolls(userId);
    const {deletePollQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeletePolls();
    const {createPollQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewPoll();
    const {updatePollActivityQuery, error: updateActivityError, isLoading: isLoadingUpdateActivity, info: updateActivityInfo} = useUpdatePollActivity();
    const {sendPollVoteQuery, error: sendError, isLoading: isLoadingSend, info: sendInfo} = useSendPollVote();

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
        refetch({userId});
    }

    async function updatePollActivity({
        id,
        updateActive,
      }:{
        id: number,
        updateActive: boolean,
    }){
        await updatePollActivityQuery({id, updateActive});
        refetch({userId});
    }

    async function sendPollVote({
        pollId,
        userId,
        voteOption,
      }:{
        pollId: number,
        userId: number,
        voteOption: string,
    }){
        await sendPollVoteQuery({pollId, userId, voteOption});
        console.log('poslao je');
        refetch({userId});
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
        sendPollVote,
        isLoadingSend,
        sendError,
        sendInfo,
    }

}