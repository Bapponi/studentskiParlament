import { useCallback, useEffect, useState } from "react";
import { fetchMembersWithRoleAPI } from "../../api/members";
import { MemberProps } from "../../pages/members/helpers";

export function useFetchMembers() {
  const [adminMembers, setAdminMembers] = useState<undefined | MemberProps[]>(undefined);
  const [otherMembers, setOtherMembers] = useState<undefined | MemberProps[]>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMembersByRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const adminResponse = await fetchMembersWithRoleAPI({roleId: 1});
      setAdminMembers(adminResponse);
      const otherResponse = await fetchMembersWithRoleAPI({roleId: 3});
      setOtherMembers(otherResponse);
    } catch (error) {
      setError(`Грешка приликом учитавања члана: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setAdminMembers, adminMembers, otherMembers, setOtherMembers, setError]);

  useEffect(() => {
    fetchMembersByRoles();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: {adminMembers, otherMembers},
    error,
    isLoading,
    refetch: fetchMembersByRoles,
  };
}
