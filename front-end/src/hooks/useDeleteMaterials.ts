import { useCallback} from "react"
import { deleteMaterialAPI } from "../api/materials";
import { useMutation } from "./base";


export function useDeleteMaterials () {

    const deleteMaterial = useCallback(
        async ({id}:{id:number}) => {
            try{
              return await deleteMaterialAPI({id})
            }catch(error){
                throw new Error('Error deleting materials');
            }
        },[]
    )

    const {status, error, isLoading} = useMutation(deleteMaterial)

    return {
        deleteMaterial,
        status, 
        error, 
        isLoading,
    }

}