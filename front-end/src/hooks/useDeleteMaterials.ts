import { useCallback, useEffect, useState} from "react"
import { deleteMaterialAPI } from "../api/materials";


export function useDeleteMaterials () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteMaterialQuery = useCallback(
        async ({id}:{id:number}) => {
          setIsLoading(true);
            
          try {
            await deleteMaterialAPI({id});
          } catch (error) {
            setError(`Грешка приликом брисања материјала: ${error}`);
          } finally {
            setIsLoading(false);
          }
                
        }, [setIsLoading, setError]
    );

    useEffect(() => {
      if(error){
        setTimeout(() => {
          setError(undefined)
        }, 5000)
      }
    }, [error])

    return {
        deleteMaterialQuery,
        isLoading,
        error, 
    }

}