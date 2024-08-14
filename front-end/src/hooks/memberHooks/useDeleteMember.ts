import { useCallback, useEffect, useState } from "react";
import { deleteMemberAPI } from "../../api/members";

export function useDeleteMembers() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMemberQuery = useCallback(
    async ({ id }: { id: number }) => {
      setIsLoading(true);
      setError(undefined); 

      try {
        await deleteMemberAPI({ id });
        setInfo("Успешно избрисан члан"); 
      } catch (error) {
        setError(`Грешка приликом брисања члана: ${error}`);
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
    deleteMemberQuery,
    isLoading,
    error,
    info,
  };
}
