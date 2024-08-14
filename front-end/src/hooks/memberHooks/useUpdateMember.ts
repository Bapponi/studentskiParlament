import { useCallback, useEffect, useState } from "react";
import { updateMemberAPI } from "../../api/members";

export function useUpdateMember() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateMemberQuery = useCallback(
    async ({
      id,
      file,
      name,
      email,
      position,
      bio,
      roleId,
    }: {
      id: number,
      file: File | null | undefined,
      name: string,
      email: string,
      position: string,
      bio: string,
      roleId: number,
    }) => {
      setIsLoading(true);
      setError(undefined); 

      try {
        await updateMemberAPI({ id, file, name, email, position, bio, roleId, });
        setInfo("Успешно ажуриран члан"); 
      } catch (error) {
        setError(`Грешка приликом ажурирања члана: ${error}`);
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
    updateMemberQuery,
    error,
    isLoading,
    info,
  };
}
