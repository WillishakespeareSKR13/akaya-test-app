import { useState, useEffect } from "react";
import { GetSeries } from "../../../api/series";
import { Serie } from "../../../types/serie";

const SERIES_PER_PAGE = 10;

interface UseSeriesDataResult {
  series: Serie[];
  isLoading: boolean;
  error: string | null;
  loadMore: (event: { detail: { complete: () => void } }) => void;
  hasMore: boolean;
}

export const useSeries = (): UseSeriesDataResult => {
  const [allSeries, setAllSeries] = useState<Serie[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMore = series.length < allSeries.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetSeries();
        console.log(data);

        const filtered = data.items.filter(
          (s: Serie) => s.status === "Published"
        );
        setAllSeries(filtered);

        setSeries(filtered.slice(0, SERIES_PER_PAGE));
        setCurrentIndex(SERIES_PER_PAGE);
      } catch (err) {
        console.error("Error fetching series:", err);
        setError("Falló la conexión con el servidor. Revisa el endpoint POST.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = (event: { detail: { complete: () => void } }) => {
    if (!hasMore) {
      event.detail.complete();
      return;
    }

    const nextIndex = currentIndex + SERIES_PER_PAGE;
    const newBatch = allSeries.slice(currentIndex, nextIndex);

    setTimeout(() => {
      setSeries((prev) => [...prev, ...newBatch]);
      setCurrentIndex(nextIndex);
      event.detail.complete();
    }, 500);
  };

  return {
    series,
    isLoading,
    error,
    loadMore,
    hasMore,
  };
};
