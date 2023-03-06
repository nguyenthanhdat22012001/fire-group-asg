import { DataInstallAppType } from '../../types/genneral';
export interface SandboxToolbarType {
    pageSpeed: string;
    onChangePageSpeed: (value: string) => void;
    isAppChecked: (app: DataInstallAppType) => boolean;
    onChangeSandboxInstallApp: (value: DataInstallAppType) => void;
    totalOrder: string;
    onChangeTotalOrder: (value: string) => void;
}
export interface StoreSandboxSpeedtype {
    point: number;
    totalOrder: number;
    isLoading: boolean;
    isError: boolean;
    onClickFixSpeed: () => void;
    onClickChatWittUs: () => void;
}
export interface StoreSandboxCredibilityType {
    listInstallApp: DataInstallAppType[];
    isLoading: boolean;
    isError: boolean;
}
