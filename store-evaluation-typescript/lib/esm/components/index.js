/* Packages */
import React, { useEffect } from 'react';
import StoreEvaluation from '../components/StoreEvaluation';
import i18n from '../locales';
function StoreEvaluationSwift({ store_id, app_name, shopify_domain, language, total_order, sandboxMode, onClickFixSpeed, onClickChatWittUs, isTotalOrderLoading }) {
    useEffect(() => {
        const languageLocal = i18n.language;
        if (language && languageLocal !== language) {
            i18n.changeLanguage(language);
        }
    }, [language]);
    return (React.createElement("div", null,
        React.createElement(StoreEvaluation, { store_id: store_id, app_name: app_name, shopify_domain: shopify_domain, total_order: total_order, onClickFixSpeed: onClickFixSpeed, onClickChatWittUs: onClickChatWittUs, isTotalOrderLoading: isTotalOrderLoading })));
}
export default StoreEvaluationSwift;
//# sourceMappingURL=index.js.map