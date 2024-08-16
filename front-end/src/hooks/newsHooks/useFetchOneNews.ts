import { useCallback, useEffect, useState } from "react";
import { fetchOneNewsAPI } from "../../api/news";
import { NewsProps } from "../../pages/news/helpers";

export function useFetchOneNews(id: number) {
  const [newsDetails, setNewsDetails] = useState<undefined | NewsProps>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOneNews = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const oneNews = await fetchOneNewsAPI({id});
      setNewsDetails(oneNews)
    } catch (error) {
      setError(`Грешка приликом учитавања вести: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setNewsDetails, newsDetails, setError]);

  useEffect(() => {
    fetchOneNews();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: newsDetails,
    error,
    isLoading,
    refetch: fetchOneNews,
  };
}
