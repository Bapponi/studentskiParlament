import { useCallback, useEffect, useState} from "react"
import { deleteLinkAPI } from "../../api/links";


export function useDeleteLinks () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteLinkQuery = useCallback(
        async ({id}:{id:number}) => {
          setIsLoading(true);
            
          try {
            await deleteLinkAPI({id});
            setInfo("Успешно избрисан линк")
          } catch (error) {
            setError(`Грешка приликом брисања линка: ${error}`);
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
        deleteLinkQuery,
        isLoading,
        error, 
        info,
    }

}