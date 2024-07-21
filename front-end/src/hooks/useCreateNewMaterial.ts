import { useCallback, useEffect, useState} from "react"
import { createMaterialAPI } from "../api/materials";


export function useCreateNewMaterial () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createMaterialQuery = useCallback(
        async ({file,title,}:{file: undefined | File | null, title: string,}) => {
        setIsLoading(true);

        try {
          await createMaterialAPI({file, title});
        } catch (error) {
          setError(`Грешка приликом креирања материјала: ${error}`);
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
        createMaterialQuery,
        error, 
        isLoading,
    }

}

