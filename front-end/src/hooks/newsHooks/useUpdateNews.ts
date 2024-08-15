import { useCallback, useEffect, useState} from "react"
import { updateLinkAPI } from "../../api/links";

export function useUpdateLink () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateLinkQuery = useCallback(
        async ({file, name, website, id}:{file: undefined | File | null, name: string, website: string, id: number}) => {
        setIsLoading(true);
        
        try {
          await updateLinkAPI({file, name, website, id});
          setInfo("Успешно ажуриран линк")
        } catch (error) {
          setError(`Грешка приликом ажурирања линка: ${error}`);
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
        updateLinkQuery,
        error, 
        isLoading,
        info,
    }

}

