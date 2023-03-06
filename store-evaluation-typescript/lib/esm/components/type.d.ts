import { DataInstallAppType } from '../types/genneral';
export interface DataPusherType {
    type: string | 'credibility';
}
export interface StoreSpeedtype {
    point: number;
    totalOrder: number;
    isLoading: boolean;
    isError: boolean;
    onClickFixSpeed: () => void;
    onClickChatWittUs: () => void;
}
export interface StoreCredibilityType {
    listInstallApp: DataInstallAppType[];
    isLoading: boolean;
    isError: boolean;
    onClickResync: () => void;
}
