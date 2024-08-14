import { useCallback, useEffect, useState } from "react";
import { newPasswordAPI, updateMemberAPI } from "../../api/members";

export function useUpdateMemberPassword() {
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateMemberPasswordQuery = useCallback(
    async ({
      email,
      password1,
      password2,
      token,
    }: {
      email: string,
      password1: string,
      password2: string,
      token: string,
    }) => {
      setIsLoading(true);
      setError(undefined); 

      try {
        await newPasswordAPI({ email, password1, password2, token });
        setInfo("Успешно промењена шифра, пребацивање на страницу за пријављивање"); 
      } catch (error) {
        setError(`Грешка приликом мењања шифре: ${error}`);
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
    updateMemberPasswordQuery,
    error,
    isLoading,
    info,
  };
}
