import { useCallback, useEffect, useState} from "react"
import { createPollAPI } from "../../api/polls";


export function useCreateNewPoll () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createPollQuery = useCallback(
        async ({
          title,
          elements,
          optionValues,
        }:{
          title: string,
          elements: number[],
          optionValues: { [key: number]: string },
        }) => {
        setIsLoading(true);

        try {
          await createPollAPI({title, elements, optionValues});
          setInfo("Успешно креирано ново гласање");
        } catch (error) {
          setError(`Грешка приликом креирања новог гласања: ${error}`);
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
      createPollQuery,
      error, 
      isLoading,
      info
    }

}

