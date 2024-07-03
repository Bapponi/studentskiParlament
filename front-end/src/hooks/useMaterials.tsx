import { useEffect, useState } from "react"
import { fetchAllMaterials, uploadMaterial } from "../api/materials";
import { MaterialProps } from "../pages/materials/helpers";


export const useMaterials = ()=>{

    const [materials, setMaterials]= useState<MaterialProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined | any>(undefined);

    // fetch

    async function fetchMaterials(){
        setLoading(true);
        try{
            const newMaterials = await fetchAllMaterials() as MaterialProps[];
            setMaterials(newMaterials);
        } catch(error){
            setError(error);
        }

        setLoading(false);
    }

    // upload

    async function uploadNewMaterial({file, title}:{file: undefined | null |  File, title:string}){
        setLoading(true);
        try{
            const newMaterial = await uploadMaterial({file, title})
            setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
        } catch(error){
            setError(error)
        }
        setLoading(false)
    }

    // ...

    useEffect(()=>{
        fetchMaterials(); 
    },[])

    return {
        materials,
        uploadMaterial : uploadNewMaterial,
        loading,
        error
    }



}