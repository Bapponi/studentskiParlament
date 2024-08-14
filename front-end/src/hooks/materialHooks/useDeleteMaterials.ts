import { useCallback, useEffect, useState } from "react";
import { deleteMaterialAPI } from "../../api/materials";

export function useDeleteMaterials() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMaterialQuery = useCallback(
    async ({ id }: { id: number }) => {
      setIsLoading(true);
      setError(undefined); 

      try {
        await deleteMaterialAPI({ id });
        setInfo("Успешно избрисан материјал"); 
      } catch (error) {
        setError(`Грешка приликом брисања материјала: ${error}`);
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
    deleteMaterialQuery,
    isLoading,
    error,
    info,
  };
}
