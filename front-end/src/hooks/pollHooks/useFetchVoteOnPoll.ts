import { useCallback, useEffect, useState } from "react";
import { isVotedOnPollAPI } from "../../api/polls";

export function useFetchVoteOnPoll(pollId: number, userId: number) {
  const [voted, setVoted] = useState<boolean>(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchVoteOnPollQuery = useCallback(
    async ({
      pollId,
      userId,
    }:{
      pollId: number,
      userId: number,
    }) => {
    setIsLoading(true);
    
    try {
      const newVoted = await isVotedOnPollAPI({pollId, userId});
      setVoted(newVoted);
    } catch (error) {
      setError(`Грешка приликом учитавања да ли је корисник гласао: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setVoted, voted, setError]);

  useEffect(() => {
    fetchVoteOnPollQuery({pollId, userId});
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: voted,
    error,
    isLoading,
    refetch: fetchVoteOnPollQuery,
  };
}
