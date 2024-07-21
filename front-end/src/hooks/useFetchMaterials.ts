import { useCallback, useEffect, useState } from "react";
import { fetchAllMaterialsAPI } from "../api/materials";
import { MaterialProps } from "../pages/materials/helpers";

export function useFetchMaterials() {
  const [materials, setMaterials] = useState<undefined | MaterialProps[]>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllMaterials = useCallback(async () => {
    setIsLoading(true);

    try {
      setTimeout(async () => {
        try {
          const newMaterials = await fetchAllMaterialsAPI();
          setMaterials(newMaterials);
        } catch (error) {
          setError(`Грешка приликом учитавања материјала: ${error}`);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      setError(`Грешка приликом учитавања материјала: ${error}`);
      setIsLoading(false);
    }
  }, [setIsLoading, setMaterials, setError]);

  useEffect(() => {
    fetchAllMaterials();
  }, []);

  return {
    data: materials,
    error,
    isLoading,
    refetch: fetchAllMaterials,
  };
}
