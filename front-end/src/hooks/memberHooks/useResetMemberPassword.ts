import { useCallback, useEffect, useState } from "react";
import { sendConfirmationMailAPI } from "../../api/members";

export function useResetMemberPassword() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendConfirmationMailQuery = useCallback(
    async (
      { 
        email,
      }: 
      { 
        email: string,
      }) => 
    {
      setIsLoading(true);
      setError(undefined);

      try {
        await sendConfirmationMailAPI({ email });
        setInfo("Послат мејл за потврду");
      } catch (error) {
        setError(`Грешка приликом слања мејла за потврду: ${error}`);
        setInfo(undefined);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setInfo]
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
    sendConfirmationMailQuery,
    error,
    isLoading,
    info,
  };
}
