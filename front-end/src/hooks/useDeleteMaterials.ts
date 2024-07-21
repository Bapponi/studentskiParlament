import { useCallback, useState} from "react"
import { deleteMaterialAPI } from "../api/materials";


export function useDeleteMaterials () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteMaterialQuery = useCallback(
        async ({id}:{id:number}) => {
            try{
                setIsLoading(true);
                //timeout kasnuje dodaj ovde kao hook setTimeout...
                await deleteMaterialAPI({id});
                setIsLoading(false);
            }catch(error){
                setError(`Грешка приликом брисања материјала: ${error}`);
            }
        },[]
    )

    return {
        deleteMaterialQuery,
        isLoading,
        error, 
    }

}