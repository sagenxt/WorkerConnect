import { DISTRICTS } from '../utils/constants';


export function formatWorkerPayload(formData: any) {
  const preDistrict = DISTRICTS.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "_") === formData.presentAddress?.district
  );

  const perDistrict = DISTRICTS.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "_") === formData.permanentAddress?.district
  );

  return {
    workerId: 0,
    // aadhaarNumber: formData.aadhaarNumber,
    aadhaarNumber: formData.aadhaarNumber.replace(/\D/g, ""),
    eCardId: formData.eCardId || '',
    eSharmId: formData.eSharmId || '',
    boCWId: formData.boCWId || '',
    accessCardId: formData.accessCardId || '',
    firstName: formData.firstName,
    lastName: formData.lastName,
    middleName: formData.middleName || '',
    gender: formData.gender,
    maritalStatus: formData.maritalStatus,
    dateOfBirth: formData.dateOfBirth,
    age: formData.age || '',
    relativeName: formData.relativeName,
    caste: formData.caste,
    subCaste: formData.subCaste || '',
    mobileNumber: Number(formData.mobileNumber),
    emailId: formData.emailId,
    password: formData.password || 'Password@123',

    // Permanent Address (flattened)
    perDoorNumber: formData.permanentAddress?.doorNumber,
    perStreet: formData.permanentAddress?.street,
    perStateId: 1,
    perStateCode: 'AP',
    perDistrictId: perDistrict?.id || 0,
    perDistrictCode: perDistrict?.name || '',
    perCityId: Number(formData.permanentAddress?.mandal || 0),
    perCityCode: formData.permanentAddress?.mandalLabel || '',
    perVillageOrAreaId: Number(formData.permanentAddress?.village || 0),
    perPincode: Number(formData.permanentAddress?.pincode || 0),

    isSameAsPerAddr: formData.sameAsPresent || false,

    // Present Address (flattened)
    preDoorNumber: formData.presentAddress?.doorNumber,
    preStreet: formData.presentAddress?.street,
    preStateId: 1,
    preStateCode: 'AP',
    preDistrictId: preDistrict?.id || 0,
    preDistrictCode: preDistrict?.name || '',
    preCityId: Number(formData.presentAddress?.mandal || 0),
    preCityCode: formData.presentAddress?.mandalLabel || '',
    preVillageOrAreaId: Number(formData.presentAddress?.village || 0),
    prePincode: Number(formData.presentAddress?.pincode || 0),

    // Memberships
    isNRESMember: formData.isNRESMember || 'N',
    isTradeUnion: formData.isTradeUnion || 'N',
    tradeUnionNumber: Number(formData.tradeUnionNumber || 0),

    // Dependents
    workerDependents: formData.dependents?.map((d: any) => ({
      dependentName: d.name,
      dateOfBirth: d.dateOfBirth,
      relationship: d.relationship,
      isNomineeSelected: d.isNominee === 'yes',  // convert string to boolean
      percentageOfBenifits: Number(d.benefitPercentage),
    })) || [],
  };
}
