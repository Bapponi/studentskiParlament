import { useCallback, useState} from "react"
import { createMaterialAPI } from "../api/materials";


export function useCreateNewMaterial () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createMaterialQuery = useCallback(
        async ({file,title,}:{file: undefined | File | null, title: string,}) => {
        setIsLoading(true);
    
        try {
        //   setTimeout(async () => {
            try {
                await createMaterialAPI({file, title});
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
        createMaterialQuery,
        error, 
        isLoading,
    }

}

