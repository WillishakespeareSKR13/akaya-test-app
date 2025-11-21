import { Serie } from "../types/serie";
import { apiClient } from "./client";

export const GetSeries = async (page: number = 1) => {
  const response = await apiClient.post("/get/series", {
    page: page,
    limit: 10,
  });
  return response.data;
};

export const GetSeriesDetail = async (id: string) => {
  const response = await apiClient.post(`/get/series/detail`, {
    id,
  });
  return response.data;
};

export const GetSeriesFavorites = async (
  favoriteIds: string[]
): Promise<Serie[]> => {
  const series = await Promise.all(
    favoriteIds.map(async (id) => GetSeriesDetail(id).then((e) => e.item))
  );
  return series;
};
