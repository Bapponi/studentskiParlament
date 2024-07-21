import { useDeleteMaterials } from "./useDeleteMaterials";
import { useFetchMaterials } from "./useFetchMaterials";
import { useCreateNewMaterial } from "./useCreateNewMaterial";

export const useMaterials = () => {
    
    const {data: materials, error: fetchError, isLoading: isLoadingFetch, refetch}= useFetchMaterials();
    const {deleteMaterialQuery, error: deleteError, isLoading: isLoadingDelete} = useDeleteMaterials();
    const {createMaterialQuery, error: createError, isLoading: isLoadingCreate} = useCreateNewMaterial();

    async function createMaterial({file, title}:{file: undefined | null |  File, title:string}){
        await createMaterialQuery({file, title});
        refetch();
    }

    async function deleteMaterial({materialToDeleteId}:{materialToDeleteId: number}){
        await deleteMaterialQuery({id: materialToDeleteId});
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
    }

}