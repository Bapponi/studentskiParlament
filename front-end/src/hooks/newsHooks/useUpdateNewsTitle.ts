import { useCallback, useEffect, useState} from "react"
import { updateNewsTitleAPI } from "../../api/news";

export function useUpdateNewsTitle () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateNewsTitleQuery = useCallback(
        async ({id, title,}:{id: number, title: string}) => {
        setIsLoading(true);
        
        try {
          await updateNewsTitleAPI({id, title});
          setInfo("Успешно ажуриран наслов вести")
        } catch (error) {
          setError(`Грешка приликом ажурирања наслова вести: ${error}`);
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
        updateNewsTitleQuery,
        error, 
        isLoading,
        info,
    }

}

