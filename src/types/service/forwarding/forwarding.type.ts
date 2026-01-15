export type TForwarding = {        
    id?: string;
    beneficiaryUuid: string;
    availabilityUuid: string;
    specialtyUuid: string;
    beneficiaryMedicalReferralUuid: string;
    approveAdditionalPayment: boolean;
}

export const ResetForwarding: TForwarding = {
    id: "",
    beneficiaryUuid: "",
    availabilityUuid: "",
    specialtyUuid: "",
    beneficiaryMedicalReferralUuid: "",
    approveAdditionalPayment: true
}

export type TForwardingSearch = {        
    recipientId: string;
    accreditedNetworkId: string;
    serviceModuleId: string;
    gte$date: any;
    lte$date: any;
    status: string;
}

export const ResetForwardingSearch: TForwardingSearch = {
    recipientId: "",
    accreditedNetworkId: "",
    serviceModuleId: "",
    gte$date: "",
    lte$date: "",
    status: "",
}