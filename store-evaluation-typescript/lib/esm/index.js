import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
// import i18n from './locales';
// import StoreEvaluationSwift from './components';
export const StoreEvaluationScore = ({ store_id, app_name, shopify_domain, language = 'en', total_order = 0, sandboxMode = false, onClickFixSpeed, onClickChatWittUs, isTotalOrderLoading = false }) => {
    return (React.createElement(AppProvider, { i18n: enTranslations }));
};
//# sourceMappingURL=index.js.map