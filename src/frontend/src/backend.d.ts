import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    message: string;
    phone: string;
    eventDate: Time;
}
export type Time = bigint;
export interface BusinessInfo {
    yearsExperience: bigint;
    name: string;
    customersServed: bigint;
    address: string;
    phone: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getBusinessInfo(): Promise<BusinessInfo>;
    submitInquiry(name: string, phone: string, message: string, eventDate: Time): Promise<void>;
}
