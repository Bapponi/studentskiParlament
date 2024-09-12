import { useCallback, useEffect, useState } from "react";
import { postLoginInfoAPI } from "../../api/members";
import { useAuth } from "../../AuthContext";

export function usePostLoginInfo() {
  const [memberRole, setMemberRole] = useState<undefined | number>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [info, setInfo] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsLoggedIn, isAdmin, setIsAdmin } = useAuth();

  const postLoginInfoQuery = useCallback(
    async (
      { email, password }: { email: string; password: string }
    ) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const memberResponse = await postLoginInfoAPI({ email, password });
        setMemberRole(memberResponse.userRole);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleId');

        localStorage.setItem('token', memberResponse.token);
        localStorage.setItem('userId', memberResponse.userId);
        localStorage.setItem('userRole', memberResponse.userRole);

        if (memberResponse.userRole == 1) {
          setIsAdmin(true);
        }
        setIsLoggedIn(true);

        setInfo("Успешна пријава, пребацивање на почетну страну...");

        // Return success with the response
        return { success: true, data: memberResponse };
      } catch (error) {
        setError(`Грешка приликом пријаве: ${error}`);
        setInfo(undefined);

        // Return error
        return { success: false, error };
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
    postLoginInfoQuery,
    memberRole,
    error,
    isLoading,
    info,
  };
}