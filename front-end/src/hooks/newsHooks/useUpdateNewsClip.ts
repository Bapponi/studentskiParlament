import { useCallback, useEffect, useState} from "react"
import { updateNewsClipAPI } from "../../api/news";

export function useUpdateNewsClip () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateNewsClipQuery = useCallback(
        async ({id, clip,}:{id: number, clip: string}) => {
        setIsLoading(true);
        
        try {
          await updateNewsClipAPI({id, clip});
          setInfo("Успешно ажуриран исечак вести")
        } catch (error) {
          setError(`Грешка приликом ажурирања исечка вести: ${error}`);
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
        updateNewsClipQuery,
        error, 
        isLoading,
        info,
    }

}

