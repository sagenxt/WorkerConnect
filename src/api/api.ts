// src/lib/api.ts
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


// export const loginEstablishment = (payload: {
//   mobileNumber: number;
//   password: string;
// }) => {
//   return api("/establishment/login", "POST", payload);
// };

export const registerEstablishment = (payload: any) => {
  return api("/establishment/registration", "POST", payload);
};

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