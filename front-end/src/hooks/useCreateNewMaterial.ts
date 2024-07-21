import { useCallback, useState} from "react"
import { uploadMaterial } from "../api/materials";


export function useCreateNewMaterial () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const createMaterialQuery = useCallback(
    //     async ({file,title,}:{file: undefined | File | null, title: string,}) => {
    //     setIsLoading(true);
    
    //     try {
    //       setTimeout(async () => {
    //         try {
    //             await uploadMaterial({file, title});
    //         } catch (error) {
    //           setError(`Грешка приликом креирања материјала: ${error}`);
    //         } finally {
    //           setIsLoading(false);
    //         }
    //       }, 1000);
    //     } catch (error) {
    //       setError(`Грешка приликом учитавања материјала: ${error}`);
    //       setIsLoading(false);
    //     }
    //   }, [setIsLoading, setError]);

    const createMaterialQuery = useCallback(
        async ({file,title,}:{file: undefined | File | null, title: string,}) => {
            try{
                setIsLoading(true);
                //timeout kasnuje dodaj ovde kao hook setTimeout...
                await uploadMaterial({file, title});
                setIsLoading(false);
            }catch(error){
                setError(`Грешка приликом креирања материјала: ${error}`);
            }
        },[]
    )

    return {
        createMaterialQuery,
        error, 
        isLoading,
    }

}

