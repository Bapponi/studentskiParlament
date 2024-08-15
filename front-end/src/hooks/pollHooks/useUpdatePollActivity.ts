import { useCallback, useEffect, useState} from "react"
import { updatePollActivityAPI } from "../../api/polls";


export function useUpdatePollActivity () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatePollActivityQuery = useCallback(
        async ({
          id,
          updateActive,
        }:{
          id: number,
          updateActive: boolean,
        }) => {
        setIsLoading(true);

        try {
          await updatePollActivityAPI({id, updateActive});
          setInfo("Успешно ажурирана активност гласања");
        } catch (error) {
          setError(`Грешка приликом ажурирања активности гласања: ${error}`);
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
      updatePollActivityQuery,
      error, 
      isLoading,
      info
    }

}

