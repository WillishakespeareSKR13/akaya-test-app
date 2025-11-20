import { apiClient } from "./client";

export const GetSeries = async () => {
  const response = await apiClient.post("/get/series");
  return response.data;
};

export const GetSeriesDetail = async (id: string) => {
  const response = await apiClient.post(`/get/series/detail?id=${id}`);
  return response.data;
};
