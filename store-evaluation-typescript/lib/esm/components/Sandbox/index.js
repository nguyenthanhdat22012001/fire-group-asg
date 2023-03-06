/* Packages */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
/* Components */
import StoreSandboxCredibility from './StoreSandboxCredibility';
import StoreSandboxSpeed from './StoreSandboxSpeed';
import SandboxToolbar from './StoreSandboxToolbar';
/* Styles */
import styles from '../styles.module.css';
function StoreEvaluationSandbox({ onClickFixSpeed, onClickChatWittUs }) {
    const { t } = useTranslation();
    const [totalOrder, setTotalOrder] = useState('0');
    const [pageSpeed, setPageSpeed] = useState('0');
    const [listInstallApp, setListInstallApp] = useState([]);
    const [isPageSpeedLoading] = useState(false);
    const [isCredibilityLoading] = useState(false);
    const [isPageSpeedError] = useState(false);
    const [isCredibilityError] = useState(false);
    const handleChangePageSpeed = (value) => setPageSpeed(value);
    const handleChangeTotalOrder = (value) => setTotalOrder(value);
    const handleChangeInstallApp = (value) => {
        setListInstallApp((prev) => {
            const findValueIndex = prev.findIndex((p) => p === value);
            if (findValueIndex === -1) {
                prev.push(value);
                return [...prev];
            }
            return prev.filter((p) => p !== value);
        });
    };
    const isAppChecked = (app) => {
        return listInstallApp.findIndex((s) => s === app) >= 0 ? true : false;
    };
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement("div", { className: styles.header },
            React.createElement("h1", { className: styles.title_page }, "SANDBOX")),
        React.createElement("p", { className: styles.des_page }, t('home_page.store_evaluation_component.des')),
        React.createElement("div", { style: { paddingBottom: 20 } },
            React.createElement(SandboxToolbar, { totalOrder: totalOrder, onChangeTotalOrder: handleChangeTotalOrder, pageSpeed: pageSpeed, onChangePageSpeed: handleChangePageSpeed, isAppChecked: isAppChecked, onChangeSandboxInstallApp: handleChangeInstallApp })),
        React.createElement("div", { className: styles.main },
            React.createElement(StoreSandboxSpeed, { point: isNaN(parseInt(`${pageSpeed}`)) ? 0 : parseInt(`${pageSpeed}`), totalOrder: parseInt(totalOrder), isLoading: isPageSpeedLoading, isError: isPageSpeedError, onClickFixSpeed: onClickFixSpeed, onClickChatWittUs: onClickChatWittUs }),
            React.createElement(StoreSandboxCredibility, { listInstallApp: listInstallApp || [], isLoading: isCredibilityLoading, isError: isCredibilityError }))));
}
export default StoreEvaluationSandbox;
//# sourceMappingURL=index.js.map