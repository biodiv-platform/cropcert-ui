export interface Admin {
    id?: number; // int64
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    ccCode?: number; // int32
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    permissions?: string[];
    role?: string;
    membershipId?: string;
    numCoffeePlots?: number; // int32
    numCoffeeTrees?: number; // int32
    farmArea?: number; // float
    coffeeArea?: number; // float
    isFT?: boolean;
    isOrg?: boolean;
    ccCode?: number; // int64
    perCoopId?: number; // int64
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
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
    dateOfBirth?: string;
    gender?: string;
    cellNumber?: string;
    email?: string;
    village?: string;
    subCountry?: string;
    permissions?: string[];
    role?: string;
}
