import { useCallback, useEffect, useState} from "react"
import { updateNewsSectionAPI } from "../../api/news";

export function useUpdateNewsSection () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateNewsSectionQuery = useCallback(
        async ({
          id,
          sectionId,
          content,
          type,
        }:{
          id: number,
          sectionId: number,
          content: string | File | null,
          type: string,
        }) => {
        setIsLoading(true);
        
        try {
          await updateNewsSectionAPI({id, sectionId, content, type});
          setInfo("Успешно ажурирана секција вести")
        } catch (error) {
          setError(`Грешка приликом ажурирања секције вести: ${error}`);
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
        updateNewsSectionQuery,
        error, 
        isLoading,
        info,
    }

}

