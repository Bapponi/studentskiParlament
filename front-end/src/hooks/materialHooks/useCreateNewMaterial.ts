import { useCallback, useEffect, useState } from "react";
import { createMaterialAPI } from "../../api/materials";

export function useCreateNewMaterial() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createMaterialQuery = useCallback(
    async ({ file, title }: { file: undefined | File | null; title: string }) => {
      setIsLoading(true);
      setError(undefined);

      try {
        await createMaterialAPI({ file, title });
        setInfo("Успешно креиран нови материјал");
      } catch (error) {
        setError(`Грешка приликом креирања материјала: ${error}`);
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
    createMaterialQuery,
    error,
    isLoading,
    info,
  };
}
