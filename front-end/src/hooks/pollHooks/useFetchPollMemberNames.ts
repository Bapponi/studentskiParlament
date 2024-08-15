import { useCallback, useEffect, useState } from "react";
import { fetchPollMemberNamesAPI } from "../../api/polls";

export function useFetchPollMemberNames(id: number) {
  const [pollMemberNames, setPollMemberNames] = useState<string[]>([]);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPollMemberNamesQuery = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const newPollsMemberNames = await fetchPollMemberNamesAPI({id});
      setPollMemberNames(newPollsMemberNames);
    } catch (error) {
      setError(`Грешка приликом учитавања чланова који су гласали: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setPollMemberNames, pollMemberNames, setError]);

  useEffect(() => {
    fetchPollMemberNamesQuery();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: pollMemberNames,
    error,
    isLoading,
    refetch: fetchPollMemberNamesQuery,
  };
}
