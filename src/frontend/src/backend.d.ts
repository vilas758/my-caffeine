import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export type PortfolioCategory = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "event";
    event: null;
} | {
    __kind__: "wedding";
    wedding: null;
} | {
    __kind__: "maternity";
    maternity: null;
} | {
    __kind__: "individual";
    individual: null;
} | {
    __kind__: "family";
    family: null;
};
export interface PortfolioItem {
    title: string;
    createdAt: Time;
    description: string;
    category: PortfolioCategory;
    image: ExternalBlob;
}
export interface ContactInquiry {
    name: string;
    createdAt: Time;
    email: string;
    message: string;
}
export interface AlbumPackage {
    features: Array<string>;
    name: string;
    createdAt: Time;
    size: AlbumSize;
    description: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum AlbumSize {
    large = "large",
    small = "small",
    medium = "medium"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAlbumPackages(): Promise<void>;
    clearContactInquiries(): Promise<void>;
    clearPortfolioItems(): Promise<void>;
    createAlbumPackage(pkg: AlbumPackage): Promise<string>;
    createPortfolioItem(input: PortfolioItem): Promise<string>;
    deleteAlbumPackage(id: string): Promise<void>;
    deleteContactInquiry(id: string): Promise<void>;
    deletePortfolioItem(id: string): Promise<void>;
    getAlbumPackage(id: string): Promise<AlbumPackage | null>;
    getAlbumPackagesBySize(size: AlbumSize): Promise<Array<AlbumPackage>>;
    getAllAlbumPackages(): Promise<Array<AlbumPackage>>;
    getAllContactInquiries(): Promise<Array<ContactInquiry>>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInquiry(id: string): Promise<ContactInquiry | null>;
    getPortfolioItem(id: string): Promise<PortfolioItem | null>;
    getPortfolioItemsByCategory(category: PortfolioCategory): Promise<Array<PortfolioItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchPortfolioItemsByTitle(search: string): Promise<Array<PortfolioItem>>;
    submitInquiry(input: ContactInquiry): Promise<string>;
    updateAlbumPackage(id: string, pkg: AlbumPackage): Promise<void>;
    updatePortfolioItem(id: string, item: PortfolioItem): Promise<void>;
}
