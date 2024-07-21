import { useCallback, useEffect, useState} from "react"
import { updateMaterialAPI } from "../api/materials";

export function useUpdateMaterial () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateMaterialQuery = useCallback(
        async ({file,title, id}:{file: undefined | File | null, title: string, id: number}) => {
        setIsLoading(true);
        
        try {
          await updateMaterialAPI({file, title, id});
        } catch (error) {
          setError(`Грешка приликом ажурирања материјала: ${error}`);
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
        updateMaterialQuery,
        error, 
        isLoading,
    }

}

