var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function StoreEvaluation({ store_id, app_name, shopify_domain, total_order = 0, isTotalOrderLoading = false, onClickFixSpeed, onClickChatWittUs }) {
    const { t } = useTranslation();
    const [pageSpeed, setPageSpeed] = useState(null);
    const [listInstallApp, setListInstallApp] = useState([]);
    const [isPageSpeedLoading, setIsPageSpeedLoading] = useState(true);
    const [isCredibilityLoading, setIsCredibilityLoading] = useState(true);
    const [isPageSpeedError, setIsPageSpeedError] = useState(false);
    const [isCredibilityError, setIsCredibilityError] = useState(false);
    useEffect(() => {
        const pusher = new Pusher(PUSHER_KEY, {
            cluster: PUSHER_APP_CLUSTER
        });
        const channel = pusher.subscribe(`${CHANNEL_SPEED_SUMMARY}-${store_id}`);
        channel.bind(EVENT_SPEED_SUMMARY, (data) => __awaiter(this, void 0, void 0, function* () {
            const { type } = data;
            const getCheckSyncSpeedSummaryResponse = yield fetchAppAPI({
                method: 'GET',
                url: 'speed-score/sync',
                params: {
                    store_id
                }
            });
            if (!getCheckSyncSpeedSummaryResponse.status)
                return;
            if ((getCheckSyncSpeedSummaryResponse === null || getCheckSyncSpeedSummaryResponse === void 0 ? void 0 : getCheckSyncSpeedSummaryResponse.error) === true) {
                setIsCredibilityError(true);
                setIsPageSpeedError(true);
                return;
            }
            getDataSpeedSummary(type);
        }));
    }, []);
    const getDataSpeedSummary = (type) => __awaiter(this, void 0, void 0, function* () {
        const getDataSpeedSummaryResponse = yield fetchAppAPI({
            url: 'speed-score',
            method: 'GET',
            params: {
                store_id
            }
        });
        const { data: { google_point, app_ar } } = getDataSpeedSummaryResponse;
        if (google_point <= 0) {
            // if (true) {
            const resyncSpeedResponse = yield fetchAppAPI({
                method: 'POST',
                url: 'speed-score/sync-speed',
                data: {
                    store_id
                }
            });
            if (resyncSpeedResponse.status) {
                if (type) {
                    if (type === 'credibility')
                        return setIsCredibilityLoading(true);
                    setIsPageSpeedLoading(true);
                }
                else {
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
    });
    useEffect(() => {
        const initStoreEvaluation = () => __awaiter(this, void 0, void 0, function* () {
            const createStoreResponse = yield fetchAppAPI({
                method: 'POST',
                url: 'store',
                data: {
                    store_id,
                    app_name,
                    shopify_domain
                }
            });
            if ((createStoreResponse === null || createStoreResponse === void 0 ? void 0 : createStoreResponse.error) === true) {
                setIsCredibilityError(true);
                setIsPageSpeedError(true);
            }
            // If done, we will get store score on page speed
            getDataSpeedSummary();
        });
        initStoreEvaluation();
    }, []);
    const onClickResync = () => __awaiter(this, void 0, void 0, function* () {
        setIsPageSpeedLoading(true);
        setIsCredibilityLoading(true);
        setPageSpeed(null);
        setListInstallApp([]);
        yield fetchAppAPI({
            url: 'speed-score/sync-speed',
            method: 'POST',
            data: {
                store_id
            }
        });
        yield fetchAppAPI({
            url: 'speed-score/sync-social',
            method: 'POST',
            data: {
                store_id
            }
        });
    });
    const onClickResyncStoreSpeed = () => __awaiter(this, void 0, void 0, function* () {
        setIsPageSpeedLoading(true);
        setPageSpeed(null);
        yield fetchAppAPI({
            url: 'speed-score/sync-speed',
            method: 'POST',
            data: {
                store_id
            }
        });
    });
    const onClickResyncStoreCredibility = () => __awaiter(this, void 0, void 0, function* () {
        setIsCredibilityLoading(true);
        setListInstallApp([]);
        yield fetchAppAPI({
            url: 'speed-score/sync-social',
            method: 'POST',
            data: {
                store_id
            }
        });
    });
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement("div", { className: styles.header },
            React.createElement("h1", { className: styles.title_page }, t('home_page.store_evaluation_component.title')),
            React.createElement("button", { onClick: () => onClickResync(), className: `${styles['btn--resync']}` }, t('home_page.dashboard_component.btn_re_evaluate'))),
        React.createElement("p", { className: styles.des_page }, t('home_page.store_evaluation_component.des')),
        React.createElement("div", { className: styles.main },
            React.createElement(StoreSpeed, { point: pageSpeed ? parseInt(`${pageSpeed}`) : 0, totalOrder: total_order, isLoading: isPageSpeedLoading || isTotalOrderLoading, isError: isPageSpeedError, onClickFixSpeed: onClickFixSpeed, onClickChatWittUs: onClickChatWittUs, onClickResync: onClickResyncStoreSpeed }),
            React.createElement(StoreCredibility, { listInstallApp: listInstallApp, isLoading: isCredibilityLoading, isError: isCredibilityError, onClickResync: onClickResyncStoreCredibility }))));
}
export default StoreEvaluation;
//# sourceMappingURL=index.js.map