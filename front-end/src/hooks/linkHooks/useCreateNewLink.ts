import { useCallback, useEffect, useState} from "react"
import { createLinkAPI } from "../../api/links";


export function useCreateNewLink () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createLinkQuery = useCallback(
        async ({file, website, name}:{file: undefined | File | null, website: string, name: string}) => {
        setIsLoading(true);

        try {
          await createLinkAPI({file, website, name});
          setInfo("Успешно креиран нови линк");
        } catch (error) {
          setError(`Грешка приликом креирања новог линка: ${error}`);
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
      createLinkQuery,
      error, 
      isLoading,
      info
    }

}

