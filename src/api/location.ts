import { api } from "../api/api";

export interface City {
  cityId: number;
  cityName: string;
  cityCode: string;
  districtId: number;
  districtName: string;
}

export interface Village {
  villageId: number;
  villageName: string;
  villageCode: string;
  cityId: number;
  cityName: string;
}

export const fetchCitiesByDistrictId = async (
  districtId: number | string
): Promise<{ value: string; label: string }[]> => {
  const result = await api<{ data: City[]; error?: { message: string } }>(
    `/cities/citiesdetailsbydistrictid?districtId=${districtId}`,
    "POST"
  );

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch mandals");
  }
  console.log(result,'result')
  return result.data?.map((city) => ({
    value: String(city.cityId),
    label: city.cityName,
  })) || [];
};

export const fetchVillagesByCityId = async (
  cityId: number | string
): Promise<{ value: string; label: string }[]> => {
  const result = await api<{ data: Village[]; error?: { message: string } }>(
    `/villagesareas/villagesareasdetailsbycityid?cityId=${cityId}`,
    "POST"
  );

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch villages");
  }

  return (
    result.data?.map((village) => ({
      value: village.villageId.toString(),
      label: village.villageName,
    })) || []
  );
};

export const fetchDistrictsByState = (stateId: number) => {
  return api(`/districts/districtsdetailsbystateid?stateId=${stateId}`, "POST");
};
