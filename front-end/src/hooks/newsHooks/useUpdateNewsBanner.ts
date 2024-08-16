import { useCallback, useEffect, useState} from "react"
import { updateNewsBannerAPI } from "../../api/news";

export function useUpdateNewsBanner () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateNewsBannerQuery = useCallback(
        async ({id, banner,}:{id: number, banner: File | null}) => {
        setIsLoading(true);
        
        try {
          await updateNewsBannerAPI({id, banner});
          setInfo("Успешно ажуриран банер вести")
        } catch (error) {
          setError(`Грешка приликом ажурирања банера вести: ${error}`);
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
        updateNewsBannerQuery,
        error, 
        isLoading,
        info,
    }

}

