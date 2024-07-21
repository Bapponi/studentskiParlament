import { useCallback, useState} from "react"
import { deleteMaterialAPI } from "../api/materials";


export function useDeleteMaterials () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteMaterialQuery = useCallback(
        async ({id}:{id:number}) => {
            setIsLoading(true);
        
            try {
            //   setTimeout(async () => {
                try {
                    await deleteMaterialAPI({id});
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
        deleteMaterialQuery,
        isLoading,
        error, 
    }

}