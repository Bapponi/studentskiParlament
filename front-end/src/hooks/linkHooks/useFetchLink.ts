import { useCallback, useEffect, useState } from "react";
import { fetchAllLinksAPI } from "../../api/links";
import { LinkProps } from "../../pages/links/helpers";

export function useFetchLinks() {
  const [links, setLinks] = useState<undefined | LinkProps[]>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllLinks = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const newLinks = await fetchAllLinksAPI();
      setLinks(newLinks);
    } catch (error) {
      setError(`Грешка приликом учитавања свих линкова: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setLinks, links, setError]);

  useEffect(() => {
    fetchAllLinks();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: links,
    error,
    isLoading,
    refetch: fetchAllLinks,
  };
}
