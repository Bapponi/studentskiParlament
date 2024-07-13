import { useState, useCallback } from 'react';

/** Type for the mutation function */
export type UseMutationFunction<TData, TVariables extends unknown> = (args: TVariables) => Promise<TData>;

/** Type for the mutation result */
export type UseMutationResult<TData, TError extends unknown, TVariables extends unknown> = {
  /** Returns last data from async function */
  data: TData | null;
  /** Callack which triggers async operation */
  mutateAsync: UseMutationFunction<TData, TVariables>;
  /** Defines status of currently running mutateAsync function */
  status: 'idle' | 'loading' | 'success' | 'error';
  /** Defines error possibly returned by mutateAsync */
  error: TError | null;
  /** Indicates if current operation is running */
  isLoading?: boolean;
};

export default function useMutation<TData, TError extends unknown, TVariables extends unknown>(mutationFunction: UseMutationFunction<TData, TVariables>): UseMutationResult<TData, TError, TVariables> {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutateAsync = useCallback(async (args: TVariables) => {
    setStatus('loading');
    setError(null);

    try {
      const result = await mutationFunction(args);
      setData(result)
      setStatus('success');
      return result;
    } catch (err) {
      setError(err as unknown as TError);
      setStatus('error');
      throw err;
    }
  }, [mutationFunction, setError, setStatus, setData]);

  return { mutateAsync, data, status, error, isLoading: status === 'loading' };
}
