import { useCallback, useEffect} from "react"
import { useQuery } from "./base";
import { fetchAllMaterialsAPI } from "../api/materials";

export function useFetchMaterials () {

    const fetchAllMaterials = useCallback(
        async () => {
            try{
              return await fetchAllMaterialsAPI()
            }catch(error){
                throw new Error('Error fetching all materials')
            }
        },[]
    )

    const {data, status, error, isLoading, refetch} = useQuery(fetchAllMaterials)

    useEffect(()=>{
        fetchAllMaterials()
    },[])

    return {
        data,
        status, 
        error, 
        isLoading,
        refetch,
    }

}