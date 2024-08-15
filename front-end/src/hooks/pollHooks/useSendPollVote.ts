import { useCallback, useEffect, useState} from "react"
import { sendPollVoteAPI } from "../../api/polls";


export function useSendPollVote () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendPollVoteQuery = useCallback(
        async ({
          pollId,
          userId,
          voteOption,
        }:{
          pollId: number,
          userId: number,
          voteOption: string,
        }) => {
        setIsLoading(true);

        try {
          await sendPollVoteAPI({pollId, userId, voteOption});
          setInfo("Успешно гласање");
        } catch (error) {
          setError(`Грешка приликом гласања: ${error}`);
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
      sendPollVoteQuery,
      error, 
      isLoading,
      info
    }

}

