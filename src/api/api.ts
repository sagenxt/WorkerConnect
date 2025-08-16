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


export interface loginPayload {
  mobileNumber: number;
  password: string;
}

export interface EstablishmentUser {
  establishmentId: string;
  establishmentName: string;
  mobileNumber: string;
  // Add other fields if needed
}

export const loginEstablishmentApi = async (payload: loginPayload) => {
  const res : any = await api<EstablishmentUser>("/establishment/login", "POST", payload);
  return res.data;
};

interface EstablishmentCategory {
  categoryId: number;
  categoryName: string;
  description: string;
}

interface EstablishmentCategoryResponse {
  data: EstablishmentCategory | EstablishmentCategory[]; // handle both single and list
}

export async function fetchEstablishmentCategories() {
  const res = await api<EstablishmentCategoryResponse>(
    "/establishmentcategory/details",
    "GET"
  );

  if (!res?.data) return [];

  const categories = Array.isArray(res.data) ? res.data : [res.data];

  return categories.map((cat) => ({
    value: String(cat.categoryId),
    label: cat.categoryName,
  }));
}


export const fetchNatureOfWorkByCategory = async (categoryId: number) => {
  const res: any = await api(
    `/establishmentworknature/details?categoryId=${categoryId}`,
    "GET"
  );

  const natureData = Array.isArray(res?.data) ? res.data : [res?.data];

  return natureData.map((item: any) => ({
    value: String(item.workNatureId),
    label: item.workNatureName,
  }));
};


export const fetchEstablishmentCardDetails = async (establishmentId: number) => {
  const res: any = await api(
    `/establishment/dashboard/carddetails?establishmentId=${establishmentId}`,
    "GET"
  );
  return res?.data || {};
};


interface WorkerUser {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  mobileNumber: number;
  emailId?: string;
  lastLoggedIn: string;
}

export const loginWorker = async (payload: loginPayload): Promise<WorkerUser> => {
  const res = await api<{ data: WorkerUser }>("/worker/login", "POST", payload);
  return res.data; // only return `data` field
};

interface AadhaarCardDetail {
  workerId: number;
  aadhaarCardNumber: string;
  workerName: string;
}

interface AadhaarCardDetailsResponse {
  correlationId: string;
  data: AadhaarCardDetail[];
  error: any;
}


export const fetchAvailableAadhaarCardDetails = async () => {
  const res = await api<AadhaarCardDetailsResponse>(
    "/establishment/availableaadhaarcarddetails",
    "GET"
  );

  const aadhaarList = Array.isArray(res.data) ? res.data : [];

  return aadhaarList.map((item) => ({
    id: item.workerId,
    label: `${item.aadhaarCardNumber} - ${item.workerName}`,
    aadhaarNumber: item.aadhaarCardNumber,
    workerName: item.workerName,
  }));
};

export const persistWorkerDetails = async (payload: {
  estmtWorkerId: number | null; // can be null if not updating existing worker
  establishmentId: number;
  workerId: number;
  aadhaarCardNumber: string;
  workingFromDate: string; // yyyy-MM-dd
  workingToDate: string; // yyyy-MM-dd
  status: string;
}) => {
  try {
    const response = await api(
      '/establishment/persistworkerdetailsbyestablishment',
      'POST',
      payload
    );
    return response;
  } catch (error: any) {
    throw new Error(`Failed to persist worker details: ${error.message}`);
  }
};


interface WorkerDetailsResponse {
  correlationId: string;
  data: any; // you can replace `any` with the actual worker object type
  error: {
    code?: string;
    message?: string;
    target?: string;
    details?: string[];
  } | null;
}

export const fetchWorkerDetailsByEstablishment = (establishmentId: number) => {
  return api<WorkerDetailsResponse>(
    `/establishment/workerdetails?establishmentId=${establishmentId}`,
    "GET"
  ).then((res) => res.data);
};


// types.ts
export interface DepartmentCardDetailsData {
  totalWorkers: number;
  presentWorkers: number;
  absentWorkers: number;
  loggedInWorkers: number;
  loggedOutWorkers: number;
  newEstablishmentWorkers: number;
  newRegistrationWorkers: number;
}

export interface DepartmentCardDetailsResponse {
  correlationId: string;
  data: DepartmentCardDetailsData;
  error?: {
    code: string;
    message: string;
    target: string;
    details: string[];
  };
}

export const fetchDepartmentCardDetails = async () => {
  const res = await api<DepartmentCardDetailsResponse>(
    "/department/dashboard/carddetails",
    "GET"
  );
  return res.data;
};

interface DepartmentLoginPayload {
  emailId: string;
  password: string;
}

interface DepartmentLoginResponse {
  correlationId: string;
  data: {
    departmentRoleId: number;
    roleName: string;
    roleDescription: string;
    departmentUserId: number;
    emailId: string;
    contactNumber: number;
    lastLoggedIn: string;
  };
  error?: {
    code: string;
    message: string;
    target: string;
    details: string[];
  };
}

export const departmentLogin = async (payload: DepartmentLoginPayload) => {
  const res = await api<DepartmentLoginResponse>(
    "/department/login",
    "POST",
    payload
  );
  return res.data;
};


export interface CheckInOutPayload {
  attendanceId: number | null;   // 0 if new, else update
  establishmentId: number;
  workerId: number;
  estmtWorkerId: number;
  workLocation: string;
  checkInDateTime?: string | null;
  checkOutDateTime?: string | null;
  status: "i" | "o"; // simplify instead of generic string
}

export interface CheckInOutResponse {
  correlationId: string;
  data: {
    statusCode: number;
    message: string;
  };
  error: {
    code: string;
    message: string;
    target: string;
    details: string[];
  } | null;
}

export const checkInOrOut = async (payload: CheckInOutPayload) => {
  return await api<CheckInOutResponse>(
    "/worker/checkinorout",
    "POST",
    payload
  );
};

