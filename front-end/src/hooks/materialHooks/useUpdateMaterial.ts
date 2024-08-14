import { useCallback, useEffect, useState } from "react";
import { updateMaterialAPI } from "../../api/materials";

export function useUpdateMaterial() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateMaterialQuery = useCallback(
    async ({
      file,
      title,
      id,
    }: {
      file: undefined | File | null;
      title: string;
      id: number;
    }) => {
      setIsLoading(true);
      setError(undefined); 

      try {
        await updateMaterialAPI({ file, title, id });
        setInfo("Успешно ажуриран материјал"); 
      } catch (error) {
        setError(`Грешка приликом ажурирања материјала: ${error}`);
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
    updateMaterialQuery,
    error,
    isLoading,
    info,
  };
}
