import { useCallback, useEffect, useState} from "react"
import { createNewsAPI } from "../../api/news";


export function useCreateNewNews () {

    const [error, setError] = useState<undefined | string>(undefined);
    const [info, setInfo] = useState<undefined | string>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createNewsQuery = useCallback(
      async ({
        banner,
        title,
        clip,
        elements,
        headerValues,
        textValues,
        uploadedPictures,
        uploadedVideos,
      }:{
        banner: File | null,
        title: string,
        clip: string,
        elements: number[],
        headerValues: { [key: number]: string },
        textValues: { [key: number]: string },
        uploadedPictures: { [key: number]: File | null },
        uploadedVideos: { [key: number]: File | null },
      }) => {
        setIsLoading(true);

        try {
          await createNewsAPI({banner, title, clip, elements, headerValues, textValues, uploadedPictures, uploadedVideos});
          setInfo("Успешно креирана нова вест");
        } catch (error) {
          setError(`Грешка приликом креирања нове вести: ${error}`);
        } finally {
          setIsLoading(false);
        }

      }, [setIsLoading, setError]
    );

    useEffect(() => {
      let errorTimeout: NodeJS.Timeout;
      let infoTimeout: NodeJS.Timeout;
  
      if (error) {
        errorTimeout = setTimeout(() => {
          setError(undefined);
        }, 5000);
      } else if (info) {
        infoTimeout = setTimeout(() => {
          setInfo(undefined);
        }, 5000);
      }
  
      return () => {
        clearTimeout(errorTimeout);
        clearTimeout(infoTimeout);
      };
    }, [error, info]);

    return {
      createNewsQuery,
      error, 
      isLoading,
      info
    }

}

