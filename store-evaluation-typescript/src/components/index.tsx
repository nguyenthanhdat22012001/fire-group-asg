/* Packages */
import React, { useEffect } from 'react';
import StoreEvaluation from '../components/StoreEvaluation';
// import StoreEvaluationSandbox from '../components/Sandbox';
import { StoreEvaluationType } from '../types/genneral';

import i18n from '../locales';

function StoreEvaluationSwift({ store_id, app_name, shopify_domain, language, total_order, sandboxMode, onClickFixSpeed, onClickChatWittUs, isTotalOrderLoading }: StoreEvaluationType) {
    useEffect(() => {
        const languageLocal = i18n.language;
        if (language && languageLocal !== language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    return (
        <div>
            {/* {sandboxMode === true ? (
                <StoreEvaluationSandbox
                    store_id={store_id}
                    app_name={app_name}
                    shopify_domain={shopify_domain}
                    total_order={total_order}
                    onClickFixSpeed={onClickFixSpeed}
                    onClickChatWittUs={onClickChatWittUs}
                />
            ) : (
                <StoreEvaluation
                    store_id={store_id}
                    app_name={app_name}
                    shopify_domain={shopify_domain}
                    total_order={total_order}
                    onClickFixSpeed={onClickFixSpeed}
                    onClickChatWittUs={onClickChatWittUs}
                    isTotalOrderLoading={isTotalOrderLoading}
                />
            )} */}
            {/* <StoreEvaluationSandbox
                store_id={store_id}
                app_name={app_name}
                shopify_domain={shopify_domain}
                total_order={total_order}
                onClickFixSpeed={onClickFixSpeed}
                onClickChatWittUs={onClickChatWittUs}
            /> */}
            <StoreEvaluation
                store_id={store_id}
                app_name={app_name}
                shopify_domain={shopify_domain}
                total_order={total_order}
                onClickFixSpeed={onClickFixSpeed}
                onClickChatWittUs={onClickChatWittUs}
                isTotalOrderLoading={isTotalOrderLoading}
            />
        </div>
    );
}

export default StoreEvaluationSwift;
