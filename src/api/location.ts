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
  cityCode: string;
}

export const fetchCitiesByDistrictId = async (
  districtId: number | string
): Promise<{ value: string; label: string;  code: string; name: string }[]> => {
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
    code: city.cityCode,
    id: city.cityId,
    name: city.cityName,
  })) || [];
};

// export const fetchVillagesByCityId = async (cityId: number | string) => {
//   const result = await api<{ data: any[]; error?: { message: string } }>(
//     `/villagesareas/villagesareasdetailsbycityid?cityId=${cityId}`,
//     "POST"
//   );

//   if (result.error) throw new Error(result.error.message || "Failed to fetch villages");

//   return result.data?.map((v) => ({
//     id: v.villageId,
//     name: v.villageName,
//     code: v.villageCode,
//     value: v.villageId,
//     label: v.villageName,
//   })) || [];
// };

export const fetchVillagesByCityId = async (
  cityId: number | string
): Promise<{ value: string; label: string; id: string; code: string; name: string }[]> => {
  const result = await api<{ data: Village[]; error?: { message: string } }>(
    `/villagesareas/villagesareasdetailsbycityid?cityId=${cityId}`,
    "POST"
  );

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch villages");
  }

  return (
    result.data?.map((village) => ({
      value: String(village.villageId),
      label: village.villageName,
      id: String(village.villageId),
      code: village.villageCode,
      name: village.villageName,
    })) || []
  );
};

// export const fetchVillagesByCityId = async (
//   cityId: number | string
// ): Promise<{ value: string; label: string }[]> => {
//   const result = await api<{ data: Village[]; error?: { message: string } }>(
//     `/villagesareas/villagesareasdetailsbycityid?cityId=${cityId}`,
//     "POST"
//   );

//   if (result.error) {
//     throw new Error(result.error.message || "Failed to fetch villages");
//   }

//   return result.data?.map((v) => ({
//     id: v.villageId,
//     name: v.villageName,
//     code: v.villageCode,
//     value: v.villageId,
//     label: v.villageName,
//   })) || [];
  
// };

export const fetchDistrictsByState = (stateId: number) => {
  return api(`/districts/districtsdetailsbystateid?stateId=${stateId}`, "POST");
};
export interface District {
  districtId: number;
  districtName: string;
  districtCode: string;
  stateId: number;
  stateCode: string;
  stateName: string;
}

export const fetchDistrictsByStateId = async (
  stateId: number | string
): Promise<{ value: string; label: string }[]> => {
  const result = await api<{ data: District[]; error?: { message: string } }>(
    `/districts/districtsdetailsbystateid?stateId=${stateId}`,
    "GET"
  );

  if (result.error) {
    throw new Error(result.error.message || "Failed to fetch districts");
  }

  return (
    result.data?.map((district) => ({
      value: String(district.districtId),
      label: district.districtName,
      code: district.districtCode,
      id: district.districtId,
      name: district.districtName,
    })) || []
  );
};
