import { useCallback, useEffect, useState } from "react";
import { fetchAllPollsAPI } from "../../api/polls";
import { PollProps } from "../../components/polls/helpers";

export function useFetchPolls(userId: number) {
  const [polls, setPolls] = useState<undefined | PollProps[]>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllPolls = useCallback(async ({
    userId,
  }:{
    userId: number
  }) => {
    setIsLoading(true);
    
    try {
      const newPolls = await fetchAllPollsAPI({userId});
      console.log('REFetch', newPolls);
      setPolls(newPolls);
    } catch (error) {
      setError(`Грешка приликом учитавања свих гласања: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setPolls, polls, setError]);

  useEffect(() => {
    fetchAllPolls({userId});
    console.log("aaaaaaa",polls)
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: polls,
    error,
    isLoading,
    refetch: fetchAllPolls,
  };
}
