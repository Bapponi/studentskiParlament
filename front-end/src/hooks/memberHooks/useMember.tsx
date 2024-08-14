import { useDeleteMembers } from "./useDeleteMember";
import { useFetchMembers } from "./useFetchMember";
import { useCreateNewMember } from "./useCreateNewMember";
import { useUpdateMember } from "./useUpdateMember";

export const useMembers = () => {
    
    const {data: {adminMembers, otherMembers}, error: fetchError, isLoading: isLoadingFetch, refetch} = useFetchMembers();
    const {deleteMemberQuery, error: deleteError, isLoading: isLoadingDelete, info: deleteInfo} = useDeleteMembers();
    const {createMemberQuery, error: createError, isLoading: isLoadingCreate, info: createInfo} = useCreateNewMember();
    const {updateMemberQuery, error: updateError, isLoading: isLoadingUpdate, info: updateInfo} = useUpdateMember();

    async function createMember({
        file,
        name,
        email,
        position,
        bio,
        roleId, 
    }:{
        file: File | null | undefined,
        name: string,
        email: string,
        position: string,
        bio: string,
        roleId: number,
    }){
        await createMemberQuery({file, name, email, position, bio, roleId});
        refetch();
    }

    async function deleteMember({memberToDeleteId}:{memberToDeleteId: number}){
        await deleteMemberQuery({id: memberToDeleteId});
        refetch();
    }

    async function updateMember({
            memberToUpdateId,
            file,
            name,
            email,
            position,
            bio,
            roleId,
        }:{
            memberToUpdateId: number,
            file: File | null | undefined,
            name: string,
            email: string,
            position: string,
            bio: string,
            roleId: number,
        }
    ){
        await updateMemberQuery({id: memberToUpdateId, file, name, email, position, bio, roleId,});
        refetch();
    }

    return {
        adminMembers,
        otherMembers,
        isLoadingFetch,
        fetchError, 
        createMember,
        isLoadingCreate,
        createError,
        createInfo,
        deleteMember,
        isLoadingDelete,
        deleteError,
        deleteInfo,
        updateMember,
        isLoadingUpdate,
        updateError,
        updateInfo,
    }

}