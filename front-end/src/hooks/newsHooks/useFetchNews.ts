import { useCallback, useEffect, useState } from "react";
import { fetchAllNewsAPI } from "../../api/news";
import { NewsProps } from "../../pages/news/helpers";

export function useFetchNews(limit: number, newsLength: number) {
  const [news, setNews] = useState<NewsProps[]>([]);
  const [totalCount, setTotalCount] = useState<undefined | number>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllNews = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const newNewsInfo = await fetchAllNewsAPI({limit, newsLength});
      const newsPanels: NewsProps[] = news.concat(newNewsInfo.news);
      
      setNews(newsPanels)
      setTotalCount(newNewsInfo.totalCount);
    } catch (error) {
      setError(`Грешка приликом учитавања свих вести: ${error}`);
    } finally {
      setIsLoading(false);
    }
        
  }, [setIsLoading, setNews, news, setTotalCount, totalCount, setError]);

  useEffect(() => {
    fetchAllNews();
  }, []);

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(undefined)
      }, 5000)
    }
  }, [error])

  return {
    data: {news, totalCount},
    error,
    isLoading,
    refetch: fetchAllNews,
  };
}
