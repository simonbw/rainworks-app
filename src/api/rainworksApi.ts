import { RAINWORKS_URL } from "../constants/urls";

export type Rainwork = any; // TODO: better rainwork type

export async function fetchRainworks(): Promise<Rainwork[]> {
  const response = await fetch(RAINWORKS_URL);
  if (!response.ok) {
    throw new Error(response.errorMessage);
  } else {
    const rainworks: Rainwork[] = await response.json();
    rainworks.sort(
      (a, b) =>
        new Date(b["installation_date"]).getTime() -
        new Date(a["installation_date"]).getTime()
    );
    return rainworks;
  }
}
