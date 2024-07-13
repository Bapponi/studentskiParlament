import { useEffect, useState } from "react"
import { deleteMaterialAPI, updateMaterialAPI, uploadMaterial } from "../api/materials";
import { MaterialProps } from "../pages/materials/helpers";
import { useDeleteMaterials } from "./useDeleteMaterials";
import { useFetchMaterials } from "./useFetchMaterials";


export const useMaterials = () => {
    
    const {data: materials, error: fetchingError, isLoading: isLoadingFetch, refetch}= useFetchMaterials();
    const {deleteMaterial, error: deleteError, isLoading: isLoadingDelete} = useDeleteMaterials();

    async function fetchMaterials(){
        // setLoading(true);
        try{
            //const newMaterials = await fetchAllMaterials() as MaterialProps[];
            //setMaterials(newMaterials);
        } catch(error){
            // setError(error);
        }
        // setLoading(false);
    }

    async function uploadNewMaterial({file, title}:{file: undefined | null |  File, title:string}){
        // setLoading(true);
        try{
            const newMaterial = await uploadMaterial({file, title})
            // setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
        } catch(error){
            // setError(error)
        }
        // setLoading(false)
    }

    //insert
    async function updateMaterial({newFile, newTitle, id}:{newFile: undefined | null |  File, newTitle:string, id: number}){
        // setLoading(true);
        try{
            const deletedId = await updateMaterialAPI({newFile, newTitle, id})
            //...
        } catch(error){
            // setError(error)
        }
        // setLoading(false)
    }

    useEffect(()=>{
        fetchMaterials(); 
    },[])

    useEffect(()=>{
        console.log('mat',materials); 
    },[materials])

    return {
        materials,
        uploadMaterial : uploadNewMaterial,
        // loading,
        // error,
        deleteMaterial,
        deleteError,
        isLoadingDelete,
    }

}