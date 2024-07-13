import { useState, useEffect, useCallback } from 'react';

// Type for the query function
export type UseQueryFunction<T> = () => Promise<T>;

// Type for the query result
export type UseQueryResult<TData, TError = unknown> = {
  /** Returns data from async operation */
  data: TData | null;
  /** Defines status of currently running async function */
  status: 'idle' | 'loading' | 'success' | 'error';
  /** Defines error possibly returned by mutateAsync */
  error: TError | null;
  /** Indicates if current operation is running */
  isLoading?: boolean;
  /** Callback which, when invoked, refetches initial callback function */
  refetch: () => Promise<void>;
};

export type UseQueryOptions = {
  /** Defines after how many milliseconds the query will re-run */
  pollInterval?: number;
  /** Defines mechanism which is going to add additional seconds to pollInterval, so it runs pollInterval + pollBackOff, next pollInterval + pollBackOff + pollBackOff and so on */
  pollBackOff?: number;
  /** Defines maximum limit in seconds after which polling will stop */
  pollLimit?: number;
  /** Defines if query can run at all */
  enabled?: boolean;
  query?: string;
}

export default function useQuery<TData, TError = unknown>(
  queryFunction: UseQueryFunction<TData>,
  options: UseQueryOptions = {}
): UseQueryResult<TData, TError> {
  const [data, setData] = useState<TData | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<TError | null>(null);

  const { pollInterval, pollBackOff, pollLimit, enabled } = options;

  const fetchData = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const result = await queryFunction();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err as unknown as TError);
      setStatus('error');
    }
  }, [queryFunction, setStatus, setError, setData]);

  useEffect(() => {
    if (enabled === false) return;

    if (!data) {
      fetchData();
    }
  
    let pollCount = 0;
    let currentInterval = pollInterval || 0;

    if (currentInterval === 0) return () => {};
    const poll = setInterval(() => {
      pollCount++;
      if (pollLimit && pollCount >= pollLimit) {
        clearInterval(poll);
      }

      fetchData();

      if (pollBackOff) {
        currentInterval += pollBackOff;
      }
    }, currentInterval);
 
    return () => {
      clearInterval(poll);
    };
  }, [enabled, pollInterval, pollBackOff, data, status, pollLimit, fetchData]);

  const refetch = useCallback(() => {
    console.log('refetcg');
    return fetchData()
  }, [fetchData])
  return { data, status, error, refetch, isLoading: status === 'loading' };
}
