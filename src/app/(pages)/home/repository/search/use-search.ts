import { useMemo } from "react";

import type { SearchRoot, SearchVariables } from "@/app/(pages)/model/search";
import axios from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";

interface Dependencies {
  variables: SearchVariables;
}

const useSearch = (deps: Dependencies) => {
  const { variables } = deps;

  const _variables = { limit: variables?.limit || 10, ...variables };
  const url = `https://itunes.apple.com/search?${queryString.stringify(
    _variables
  )}`;

  const { data, error, isLoading } = useQuery<SearchRoot, Error>(
    ["search", variables],
    async () => {
      const response = await axios.get(url);
      return response.data;
    },
    { retry: false }
  );

  return useMemo(() => {
    const normalized: SearchRoot = {
      resultCount: data?.resultCount || 0,
      results: data?.results || [],
    };
    return {
      data: normalized,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useSearch;
export { useSearch };
