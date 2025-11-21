import { useState, useEffect } from "react";
import { GetSeries } from "../../../api/series";
import { Serie } from "../../../types/serie";

const SERIES_PER_PAGE = 10;

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  totalPages: number;
}

interface UseSeriesDataResult {
  series: Serie[];
  isLoading: boolean;
  error: string | null;
  loadMore: (event: { target: { complete: () => void } }) => void;
  hasMore: boolean;
}

export const useSeries = (): UseSeriesDataResult => {
  const [series, setSeries] = useState<Serie[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 0,
    limit: SERIES_PER_PAGE,
    hasMore: true,
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPaginating, setIsPaginating] = useState(false);
  const hasMore = pagination.hasMore;

  const fetchData = async (pageToLoad: number) => {
    pageToLoad === 1 ? setIsLoading(true) : setIsPaginating(true);

    try {
      const response = await GetSeries(pageToLoad);
      const data = response.items;
      const newPagination = response.pagination;

      const filtered = data.filter((s: Serie) => s.status === "Published");

      setSeries((prev) =>
        pageToLoad === 1 ? filtered : [...prev, ...filtered]
      );

      setPagination(newPagination);
    } catch (err) {
      console.error("Error fetching series:", err);
      setError("Falló la conexión con el servidor. Revisa el endpoint POST.");
    } finally {
      setIsLoading(false);
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    if (series.length === 0 && pagination.page === 0) {
      fetchData(1);
    }
  }, []);

  const loadMore = (event: { target: { complete: () => void } }) => {
    console.log(event);
    if (!hasMore || isPaginating) {
      event.target.complete();
      return;
    }

    const nextPage = pagination.page + 1;

    fetchData(nextPage).finally(() => {
      event.target.complete();
    });
  };

  return {
    series,
    isLoading,
    error,
    loadMore,
    hasMore,
  };
};
