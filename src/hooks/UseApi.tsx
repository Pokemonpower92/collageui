import { useEffect, useState } from "react";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T>(apiFunc: () => Promise<T>): ApiResponse<T> {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const send = async () => {
      try {
        const resp = await apiFunc();
        setState({
          data: resp,
          error: null,
          loading: false,
        });
      } catch (e: unknown) {
        if (e instanceof Error) {
          setState({
            data: null,
            error: e.message,
            loading: false,
          });
        }
      }
    };
    send();
  }, [apiFunc]);
  return state;
}
