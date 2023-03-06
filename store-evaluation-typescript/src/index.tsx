import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
// import { I18nextProvider } from 'react-i18next';
import { StoreEvaluationType } from './types/genneral';
// import i18n from './locales';
import StoreEvaluationSwift from './components';

export const StoreEvaluationScore = ({
    store_id,
    app_name,
    shopify_domain,
    language = 'en',
    total_order = 0,
    sandboxMode = false,
    onClickFixSpeed,
    onClickChatWittUs,
    isTotalOrderLoading = false
}: StoreEvaluationType) => {
    return (
        <AppProvider i18n={enTranslations}>
            {/* <I18nextProvider i18n={i18n}> */}
            <StoreEvaluationSwift
                store_id={store_id}
                app_name={app_name}
                shopify_domain={shopify_domain}
                language={language}
                total_order={total_order}
                sandboxMode={sandboxMode}
                onClickFixSpeed={onClickFixSpeed}
                onClickChatWittUs={onClickChatWittUs}
                isTotalOrderLoading={isTotalOrderLoading}
            />
            {/* </I18nextProvider> */}
        </AppProvider>
    );
};
