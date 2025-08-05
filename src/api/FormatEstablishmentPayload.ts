import { DISTRICTS } from '../utils/constants';

export function formatEstablishmentPayload(formData: any) {
  const selectedDistrict = DISTRICTS.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "_") === formData.district
  );

  return {
    establishmentName: formData.establishmentName,
    contactPerson: formData.ownerName,
    emailId: formData.emailAddress,
    mobileNumber: formData.mobileNumber,
    doorNo: formData.doorNumber,
    street: formData.street,
    districtId: selectedDistrict?.id,
    districtCode: selectedDistrict?.name, // adjust if needed
    cityId: Number(formData.mandal),
    cityCode: formData.mandalLabel || '', // If you store label elsewhere
    villageId: Number(formData.village),
    villageCode: formData.villageLabel || '',

    isPlanApprovalId: formData.hasPlanApproval === 'yes',
    planApprovalId: formData.planApprovalId || null,
    establishmentCategory: formData.establishmentCategory,
    natureOfWork: formData.natureOfWork,
    commencementDate: formData.commencementDate,
    completionDate: formData.completionDate || null,
    noOfContractors: Number(formData.contractorsWorking || 0),
    contractorsList: formData.contractors || [],

    constructionEstimatedCost: Number(formData.estimatedCost || 0),
    constructionArea: formData.constructionArea,
    builtUpArea: formData.builtUpArea,
    basicEstimationCost: Number(formData.basicEstimationCost || 0),
    noOfMaleWorkers: Number(formData.maleWorkers || 0),
    noOfFemaleWorkers: Number(formData.femaleWorkers || 0),

    isAcceptedTermsAndConditions: formData.declaration === true,
    pincode: formData.pincode,
    stateId: 1,
    stateCode: 'AP',
  };
}
