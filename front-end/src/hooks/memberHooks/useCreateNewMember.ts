import { useCallback, useEffect, useState } from "react";
import { createMemberAPI } from "../../api/members";

export function useCreateNewMember() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createMemberQuery = useCallback(
    async (
      { 
        file,
        name,
        email,
        position,
        bio,
        roleId, 
      }: 
      { 
        file: File | null | undefined,
        name: string,
        email: string,
        position: string,
        bio: string,
        roleId: number,
      }) => 
    {
      setIsLoading(true);
      setError(undefined);

      try {
        await createMemberAPI({ file, name, email, position, bio, roleId });
        setInfo("Успешно креиран нови члан");
      } catch (error) {
        setError(`Грешка приликом креирања члана: ${error}`);
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
    createMemberQuery,
    error,
    isLoading,
    info,
  };
}
