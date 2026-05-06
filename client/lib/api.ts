import type { FormData, PredictionResponse } from "../types/prediction";

const fallbackApiBaseUrl = "http://127.0.0.1:8000";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl;
}

export async function predictFailure(formData: FormData): Promise<PredictionResponse> {
  const response = await fetch(`${getApiBaseUrl()}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Prediction request failed with status ${response.status}`);
  }

  return response.json() as Promise<PredictionResponse>;
}
