import { useCallback, useEffect, useState } from "react";
import { fetchMemberNameAPI } from "../../api/members";

export function useFetchMemberName(id: number) {
  const [memberName, setMemberName] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMemberName = useCallback(async () => {

    setIsLoading(true);
    try {
      const name = await fetchMemberNameAPI({id});
      setMemberName(name);
    } catch (error) {
      setError(`Грешка приликом хватања имена члана: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, memberName, setMemberName, setError]);

  useEffect(() => {
    fetchMemberName();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: memberName,
    error,
    isLoading,
  };
}
