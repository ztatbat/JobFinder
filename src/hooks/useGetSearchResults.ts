import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { filterResults, sortResults, paginateResults } from '../utils/functions';

interface Filters {
  searchString?: string;
  category: 'AI / Research & Development' | 'Artificial Intelligence' | 'Financial Services' | 'Human Resources' | 'Software Engineering' | 'All';
  sortBy: 'Name' | 'Creation Date' | 'Update Date' | 'None';
  sortType: 'ASC' | 'DESC';
  page: number;
}

interface UseGetSearchResultsResult {
  displayedElements: Object[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const elementsPerPage = 10; 

const defaultFilters: Filters = {
  searchString: undefined,
  category: 'All',
  sortBy: 'None',
  sortType: 'ASC',
  page: 1,
};

const useGetSearchResults = (filters: Filters): UseGetSearchResultsResult => {
  const [results, setResults] = useState<Object[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedElements, setDisplayedElements] = useState<Object[]>([]);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_REACT_APP_HRFLOW_API_KEY;
    const boardKeys = import.meta.env.VITE_REACT_APP_HRFLOW_BOARD_KEYS;

    if (!apiKey) {
      console.error("API Key is missing! Make sure to add it to your .env file.");
      setError("API Key is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://api.hrflow.ai/v1/jobs/searching', {
        params: {
          board_keys: [boardKeys],
        },
        headers: {
          'X-API-KEY': apiKey,
        },
      });

      const data = response.data.data;
      setResults(data.jobs || []);
    } catch (err) {
      console.error('Failed to fetch search results:', err);
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const debouncedFetchData = useMemo(() => debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [debouncedFetchData]);

  // Memoized processing of results
  const processedResults = useMemo(() => {
    const filteredResults = filterResults(results, filters.searchString, filters.category);
    const sortedResults = sortResults(filteredResults, filters.sortBy, filters.sortType);
    const paginatedResults = paginateResults(sortedResults, filters.page, elementsPerPage);

    setTotalPages(Math.ceil(sortedResults.length / elementsPerPage));

    return paginatedResults;
  }, [results, filters.searchString, filters.category, filters.sortBy, filters.sortType, filters.page]);

  useEffect(() => {
    setDisplayedElements(processedResults);
  }, [processedResults]);

  // Save filters to localStorage if they differ from the default ones
  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(defaultFilters)) {
      localStorage.setItem('filters', JSON.stringify(filters));
    }
  }, [filters]);

  return { displayedElements, totalPages, loading, error };
};

export default useGetSearchResults;
