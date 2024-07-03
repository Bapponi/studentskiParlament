// import { MaterialProps } from "../pages/materials/helpers";

const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:8000/material');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    //   const data: MaterialProps[] = await response.json();
    //   setMaterials(data);
    } catch (error) {
      if (error instanceof Error) {
        // setError(error.message);
      } else {
        // setError('An unknown error occurred');
      }
    } finally {
    //   setIsLoading(false);
    }
};

export default fetchMaterials;