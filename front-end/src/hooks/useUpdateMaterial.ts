import { useCallback, useState} from "react"
import { updateMaterialAPI } from "../api/materials";

export function useUpdateMaterial () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateMaterialQuery = useCallback(
        async ({file,title, id}:{file: undefined | File | null, title: string, id: number}) => {
        setIsLoading(true);
    
        try {
        //   setTimeout(async () => {
            try {
                await updateMaterialAPI({file, title, id});
            } catch (error) {
              setError(`Грешка приликом креирања материјала: ${error}`);
            } finally {
              setIsLoading(false);
            }
        //   }, 1000);
        } catch (error) {
          setError(`Грешка приликом учитавања материјала: ${error}`);
          setIsLoading(false);
        }
      }, [setIsLoading, setError]
    );

    return {
        updateMaterialQuery,
        error, 
        isLoading,
    }

}

