import { useState, useEffect } from "react";
import { Serie } from "../../../types/serie";
import { GetSeriesFavorites } from "../../../api/series";
import { useAtomValue } from "jotai";
import { FavoriteIdsArrayAtom } from "../../../stores/favorities";

interface UseSeriesDataResult {
  favorities: Serie[];
}

export const useFavorities = (): UseSeriesDataResult => {
  const favoriteIds = useAtomValue(FavoriteIdsArrayAtom);
  const [favorities, setFavorities] = useState<Serie[]>([]);

  const fetchData = async () => {
    try {
      const response = await GetSeriesFavorites(favoriteIds);
      setFavorities(response);
    } catch (err) {
      console.error("Error fetching favorities:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [favoriteIds]);

  return {
    favorities,
  };
};
