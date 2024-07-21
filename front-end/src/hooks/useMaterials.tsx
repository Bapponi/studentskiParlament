import { useDeleteMaterials } from "./useDeleteMaterials";
import { useFetchMaterials } from "./useFetchMaterials";
import { useCreateNewMaterial } from "./useCreateNewMaterial";
import { useUpdateMaterial } from "./useUpdateMaterial"

export const useMaterials = () => {
    
    const {data: materials, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchMaterials();
    const {deleteMaterialQuery, error: deleteError, isLoading: isLoadingDelete} = useDeleteMaterials();
    const {createMaterialQuery, error: createError, isLoading: isLoadingCreate} = useCreateNewMaterial();
    const {updateMaterialQuery, error: updateError, isLoading: isLoadingUpdate} = useUpdateMaterial();

    async function createMaterial({file, title}:{file: undefined | null | File, title: string}){
        await createMaterialQuery({file, title});
        refetch();
    }

    async function deleteMaterial({materialToDeleteId}:{materialToDeleteId: number}){
        await deleteMaterialQuery({id: materialToDeleteId});
        refetch();
    }

    async function updateMaterial({file, title, materialToUpdateId}:
        {
            file: undefined | null | File, 
            title: string, 
            materialToUpdateId: number,
        }
    ){
        await updateMaterialQuery({file, title, id: materialToUpdateId});
        refetch();
    }

    return {
        materials,
        isLoadingFetch,
        fetchError, 
        createMaterial,
        isLoadingCreate,
        createError,
        deleteMaterial,
        isLoadingDelete,
        deleteError,
        updateMaterial,
        isLoadingUpdate,
        updateError,
    }

}