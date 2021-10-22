export interface Admin {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
}
export interface BodyPart {
    entity?: {
    };
    headers?: {
        [name: string]: string[];
    };
    mediaType?: MediaType;
    parent?: MultiPart;
    providers?: Providers;
    contentDisposition?: ContentDisposition;
    parameterizedHeaders?: {
        [name: string]: ParameterizedHeader[];
    };
}
export interface CollectionCenter {
    id?: number; // int64
    code?: number; // int64
    name?: string;
    village?: string;
    subCountry?: string;
    latitude?: number; // float
    longitude?: number; // float
    altitude?: number; // float
    type?: string;
    coCode?: number; // int64
}
export interface CollectionCenterPerson {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    ccCode?: number; // int32
}
export interface CollectionCenterShow {
    id?: number; // int64
    type?: string;
    coCode?: number; // int64
    code?: number; // int64
    name?: string;
    coName?: string;
    unionName?: string;
    village?: string;
    subCountry?: string;
    latitude?: number; // float
    longitude?: number; // float
    altitude?: number; // float
}
export interface ContentDisposition {
    type?: string;
    parameters?: {
        [name: string]: string;
    };
    fileName?: string;
    creationDate?: string; // date-time
    modificationDate?: string; // date-time
    readDate?: string; // date-time
    size?: number; // int64
}
export interface Cooperative {
    id?: number; // int64
    code?: number; // int64
    name?: string;
    village?: string;
    subCountry?: string;
    latitude?: number; // float
    longitude?: number; // float
    altitude?: number; // float
    unionCode?: number; // int64
    numFarmer?: number; // int64
    farSeqNumber?: number; // int64
}
export interface CooperativePerson {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    coCode?: number; // int32
}
export interface FactoryPerson {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    factoryCode?: number; // int32
}
export interface Farmer {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    numCoffeePlots?: number; // int32
    numCoffeeTrees?: number; // int32
    farmArea?: number; // float
    coffeeArea?: number; // float
    farmerCode?: string;
    ccCode?: number; // int64
    ccName?: string;
    coName?: string;
    unionName?: string;
    fieldCoOrdinator?: number; // int64
}
export interface FarmerFileMetadata {
    fileType?: string;
    ccNameColumnName?: string;
    ccCodeColumnName?: string;
    farmerCodeColumnName?: string;
    farmerIdColumnName?: string;
    nameColumnName?: string;
    genderColumnName?: string;
    birthDateColumnName?: string;
    numCoffeePlotsColumnName?: string;
    numCoffeeTreesColumnName?: string;
    farmAreaColumnName?: string;
    coffeeAreaColumnName?: string;
    cellNumberColumnName?: string;
    emailColumnName?: string;
    villageColumnName?: string;
    subCountryColumnName?: string;
}
export interface FormDataBodyPart {
    entity?: {
    };
    headers?: {
        [name: string]: string[];
    };
    mediaType?: MediaType;
    parent?: MultiPart;
    providers?: Providers;
    simple?: boolean;
    formDataContentDisposition?: FormDataContentDisposition;
    contentDisposition?: ContentDisposition;
    name?: string;
    value?: string;
    parameterizedHeaders?: {
        [name: string]: ParameterizedHeader[];
    };
}
export interface FormDataContentDisposition {
    type?: string;
    parameters?: {
        [name: string]: string;
    };
    fileName?: string;
    creationDate?: string; // date-time
    modificationDate?: string; // date-time
    readDate?: string; // date-time
    size?: number; // int64
    name?: string;
}
export interface FormDataMultiPart {
    entity?: {
    };
    headers?: {
        [name: string]: string[];
    };
    mediaType?: MediaType;
    parent?: MultiPart;
    providers?: Providers;
    bodyParts?: BodyPart[];
    fields?: {
        [name: string]: FormDataBodyPart[];
    };
    contentDisposition?: ContentDisposition;
    parameterizedHeaders?: {
        [name: string]: ParameterizedHeader[];
    };
}
export interface MediaType {
    type?: string;
    subtype?: string;
    parameters?: {
        [name: string]: string;
    };
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
}
export interface MultiPart {
    entity?: {
    };
    headers?: {
        [name: string]: string[];
    };
    mediaType?: MediaType;
    parent?: MultiPart;
    providers?: Providers;
    bodyParts?: BodyPart[];
    contentDisposition?: ContentDisposition;
    parameterizedHeaders?: {
        [name: string]: ParameterizedHeader[];
    };
}
export interface ParameterizedHeader {
    value?: string;
    parameters?: {
        [name: string]: string;
    };
}
export interface Providers {
}
export interface StreamingOutput {
}
export interface Union {
    id?: number; // int64
    code?: number; // int64
    name?: string;
    village?: string;
    subCountry?: string;
    latitude?: number; // float
    longitude?: number; // float
    altitude?: number; // float
}
export interface UnionPerson {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    unionCode?: number; // int64
    unionName?: string;
}
export interface User {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string; // date-time
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    sign?: string;
    permissions?: string[];
    role?: string;
}
