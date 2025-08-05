const BASE_URL = "http://108.181.164.242:8085/labourms/v1/services/adapter";


export async function api<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
): Promise<T> {
  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(data) : undefined,
    }
  );

  const result = await response.json();

  if (!response.ok || result.error) {
    throw new Error(result.error?.message || "API request failed");
  }

  return result;
}


export const registerEstablishment = (payload: any) => {
  return api("/establishment/registration", "POST", payload);
};


export const registerWorker = (payload: any) => {
  return api("/worker/registration", "POST", payload);
};

export async function submitApiRequest(url: string, payload: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
}


export interface EstablishmentLoginPayload {
  mobileNumber: number;
  password: string;
}

export interface EstablishmentUser {
  establishmentId: string;
  establishmentName: string;
  mobileNumber: string;
  // Add other fields if needed
}

export const loginEstablishment = (payload: EstablishmentLoginPayload) => {
  return api<EstablishmentUser>("/establishment/login", "POST", payload);
};