import { useCallback, useEffect, useState} from "react"
import { deleteNewsAPI } from "../../api/news";


export function useDeleteNews () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteNewsQuery = useCallback(
        async ({id}:{id:number}) => {
          setIsLoading(true);
            
          try {
            await deleteNewsAPI({id});
            setInfo("Успешно избрисана вест")
          } catch (error) {
            setError(`Грешка приликом брисања вести: ${error}`);
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
        deleteNewsQuery,
        isLoading,
        error, 
        info,
    }

}