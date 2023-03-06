/* Packages */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Pusher from 'pusher-js';

/* Components */
import StoreCredibility from '../StoreCredibility';
import StoreSpeed from '../StoreSpeed';

/* Hooks */
import { fetchAppAPI } from '../../hooks';

/* Constants */
import { CHANNEL_SPEED_SUMMARY, EVENT_SPEED_SUMMARY, PUSHER_APP_CLUSTER, PUSHER_KEY } from '../../constants/pusher';

/* Styles */
import styles from '../styles.module.css';
import { DataPusherType } from '../type';
import { DataInstallAppType, StoreEvaluationType } from '../../types/genneral';

function StoreEvaluation({ store_id, app_name, shopify_domain, total_order = 0, isTotalOrderLoading = false, onClickFixSpeed, onClickChatWittUs }: StoreEvaluationType) {
    const { t } = useTranslation();

    const [pageSpeed, setPageSpeed] = useState(null);
    const [listInstallApp, setListInstallApp] = useState<DataInstallAppType[]>([]);

    const [isPageSpeedLoading, setIsPageSpeedLoading] = useState(true);
    const [isCredibilityLoading, setIsCredibilityLoading] = useState(true);

    const [isPageSpeedError, setIsPageSpeedError] = useState(false);
    const [isCredibilityError, setIsCredibilityError] = useState(false);

    useEffect(() => {
        const pusher = new Pusher(PUSHER_KEY, {
            cluster: PUSHER_APP_CLUSTER
        });

        const channel = pusher.subscribe(`${CHANNEL_SPEED_SUMMARY}-${store_id}`);

        channel.bind(EVENT_SPEED_SUMMARY, async (data: DataPusherType) => {
            const { type } = data;

            const getCheckSyncSpeedSummaryResponse = await fetchAppAPI({
                method: 'GET',
                url: 'speed-score/sync',
                params: {
                    store_id
                }
            });

            if (!getCheckSyncSpeedSummaryResponse.status) return;

            if (getCheckSyncSpeedSummaryResponse?.error === true) {
                setIsCredibilityError(true);
                setIsPageSpeedError(true);

                return;
            }

            getDataSpeedSummary(type);
        });
    }, []);

    const getDataSpeedSummary = async (type?: string) => {
        const getDataSpeedSummaryResponse = await fetchAppAPI({
            url: 'speed-score',
            method: 'GET',
            params: {
                store_id
            }
        });

        const {
            data: { google_point, app_ar }
        } = getDataSpeedSummaryResponse;

        if (google_point <= 0) {
            // if (true) {
            const resyncSpeedResponse = await fetchAppAPI({
                method: 'POST',
                url: 'speed-score/sync-speed',
                data: {
                    store_id
                }
            });

            if (resyncSpeedResponse.status) {
                if (type) {
                    if (type === 'credibility') return setIsCredibilityLoading(true);
                    setIsPageSpeedLoading(true);
                } else {
                    setIsCredibilityLoading(true);
                    setIsPageSpeedLoading(true);
                }
            }

            return;
        }
        setPageSpeed(google_point);
        setListInstallApp(app_ar || []);

        setIsPageSpeedLoading(false);
        setIsCredibilityLoading(false);
    };

    useEffect(() => {
        const initStoreEvaluation = async () => {
            const createStoreResponse = await fetchAppAPI({
                method: 'POST',
                url: 'store',
                data: {
                    store_id,
                    app_name,
                    shopify_domain
                }
            });

            if (createStoreResponse?.error === true) {
                setIsCredibilityError(true);
                setIsPageSpeedError(true);
            }

            // If done, we will get store score on page speed
            getDataSpeedSummary();
        };

        initStoreEvaluation();
    }, []);

    const onClickResync = async () => {
        setIsPageSpeedLoading(true);
        setIsCredibilityLoading(true);

        setPageSpeed(null);
        setListInstallApp([]);

        await fetchAppAPI({
            url: 'speed-score/sync-speed',
            method: 'POST',
            data: {
                store_id
            }
        });

        await fetchAppAPI({
            url: 'speed-score/sync-social',
            method: 'POST',
            data: {
                store_id
            }
        });
    };

    const onClickResyncStoreSpeed = async () => {
        setIsPageSpeedLoading(true);
        setPageSpeed(null);

        await fetchAppAPI({
            url: 'speed-score/sync-speed',
            method: 'POST',
            data: {
                store_id
            }
        });
    };

    const onClickResyncStoreCredibility = async () => {
        setIsCredibilityLoading(true);
        setListInstallApp([]);

        await fetchAppAPI({
            url: 'speed-score/sync-social',
            method: 'POST',
            data: {
                store_id
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title_page}>{t('home_page.store_evaluation_component.title')}</h1>

                <button onClick={() => onClickResync()} className={`${styles['btn--resync']}`}>
                    {t('home_page.dashboard_component.btn_re_evaluate')}
                </button>
            </div>

            <p className={styles.des_page}>{t('home_page.store_evaluation_component.des')}</p>

            <div className={styles.main}>
                <StoreSpeed
                    point={pageSpeed ? parseInt(`${pageSpeed}`) : 0}
                    totalOrder={total_order}
                    isLoading={isPageSpeedLoading || isTotalOrderLoading}
                    isError={isPageSpeedError}
                    onClickFixSpeed={onClickFixSpeed}
                    onClickChatWittUs={onClickChatWittUs}
                    onClickResync={onClickResyncStoreSpeed}
                />

                <StoreCredibility listInstallApp={listInstallApp} isLoading={isCredibilityLoading} isError={isCredibilityError} onClickResync={onClickResyncStoreCredibility} />
            </div>
        </div>
    );
}

export default StoreEvaluation;
