/* Packages */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/* Components */
import StoreSandboxCredibility from './StoreSandboxCredibility';
import StoreSandboxSpeed from './StoreSandboxSpeed';
import SandboxToolbar from './StoreSandboxToolbar';

/* Styles */
import styles from '../styles.module.css';
import { DataInstallAppType, StoreEvaluationType } from '../../types/genneral';

function StoreEvaluationSandbox({ onClickFixSpeed, onClickChatWittUs }: StoreEvaluationType) {
    const { t } = useTranslation();

    const [totalOrder, setTotalOrder] = useState('0');
    const [pageSpeed, setPageSpeed] = useState('0');
    const [listInstallApp, setListInstallApp] = useState<DataInstallAppType[]>([]);

    const [isPageSpeedLoading] = useState(false);
    const [isCredibilityLoading] = useState(false);

    const [isPageSpeedError] = useState(false);
    const [isCredibilityError] = useState(false);

    const handleChangePageSpeed = (value: string) => setPageSpeed(value);
    const handleChangeTotalOrder = (value: string) => setTotalOrder(value);

    const handleChangeInstallApp = (value: DataInstallAppType) => {
        setListInstallApp((prev) => {
            const findValueIndex = prev.findIndex((p) => p === value);

            if (findValueIndex === -1) {
                prev.push(value);
                return [...prev];
            }

            return prev.filter((p) => p !== value);
        });
    };

    const isAppChecked = (app: DataInstallAppType) => {
        return listInstallApp.findIndex((s) => s === app) >= 0 ? true : false;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title_page}>SANDBOX</h1>
            </div>
            <p className={styles.des_page}>{t('home_page.store_evaluation_component.des')}</p>

            <div style={{ paddingBottom: 20 }}>
                <SandboxToolbar
                    totalOrder={totalOrder}
                    onChangeTotalOrder={handleChangeTotalOrder}
                    pageSpeed={pageSpeed}
                    onChangePageSpeed={handleChangePageSpeed}
                    isAppChecked={isAppChecked}
                    onChangeSandboxInstallApp={handleChangeInstallApp}
                />
            </div>

            <div className={styles.main}>
                <StoreSandboxSpeed
                    point={isNaN(parseInt(`${pageSpeed}`)) ? 0 : parseInt(`${pageSpeed}`)}
                    totalOrder={parseInt(totalOrder)}
                    isLoading={isPageSpeedLoading}
                    isError={isPageSpeedError}
                    onClickFixSpeed={onClickFixSpeed}
                    onClickChatWittUs={onClickChatWittUs}
                />

                <StoreSandboxCredibility listInstallApp={listInstallApp || []} isLoading={isCredibilityLoading} isError={isCredibilityError} />
            </div>
        </div>
    );
}

export default StoreEvaluationSandbox;
