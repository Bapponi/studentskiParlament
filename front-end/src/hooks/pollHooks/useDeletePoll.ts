import { useCallback, useEffect, useState} from "react"
import { deletePollAPI } from "../../api/polls";


export function useDeletePolls () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deletePollQuery = useCallback(
        async ({id}:{id:number}) => {
          setIsLoading(true);
            
          try {
            await deletePollAPI({id});
            setInfo("Успешно избрисано гласање")
          } catch (error) {
            setError(`Грешка приликом брисања гласања: ${error}`);
          } finally {
            setIsLoading(false);
          }
                
        }, [setIsLoading, setError]
    );

    useEffect(() => {
      let errorTimeout: NodeJS.Timeout;
      let infoTimeout: NodeJS.Timeout;
  
      if (error) {
        errorTimeout = setTimeout(() => {
          setError(undefined);
        }, 5000);
      } else if (info) {
        infoTimeout = setTimeout(() => {
          setInfo(undefined);
        }, 5000);
      }
  
      return () => {
        clearTimeout(errorTimeout);
        clearTimeout(infoTimeout);
      };
    }, [error, info]);

    return {
      deletePollQuery,
      isLoading,
      error, 
      info,
    }

}