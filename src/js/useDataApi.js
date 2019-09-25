import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialData, initialUrl) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axios(url);
        setData(result.data.results);
      } catch(error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    
    fetchData();
    }, [url]);
  
    return [{ data, setData, isLoading, setIsLoading, page, setPage }, setUrl]
  }  

export default useDataApi;