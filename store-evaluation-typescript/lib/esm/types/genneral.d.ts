export interface StoreEvaluationType {
    store_id: string;
    app_name: string;
    shopify_domain: string;
    language?: LanguageType;
    total_order?: number;
    sandboxMode?: boolean;
    onClickFixSpeed: () => void;
    onClickChatWittUs: () => void;
    isTotalOrderLoading?: boolean;
}
type LanguageType = 'en' | 'de' | 'es' | 'fr' | 'it' | 'ja' | 'jp' | 'pt';
export type DataInstallAppType = 'yotpo' | 'loox' | 'judgeme' | 'fera' | 'automizely' | 'alireview';
export {};
