import { Circle } from 'rc-progress';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, EmptyState, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';
import { useTranslation } from 'react-i18next';

import ReEvaluationIcon from '../../assets/re-evaluationIcon.svg';

/* Constants */
import STORE_CREDIBILITY_MESSAGE from './constants';

/* Styles */
import styles from '../styles.module.css';
import { StoreCredibilityType } from '../type';
import { DataInstallAppType } from '../../types/genneral';

const STORE_ICONS = [
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.15977 13.4C3.02729 13.4 2.89545 13.3591 2.78409 13.2784C2.59208 13.1389 2.49224 12.9047 2.52616 12.6692L3.12073 8.50676L0.787273 6.17275C0.617673 6.00315 0.557512 5.75356 0.630473 5.52509C0.703433 5.29662 0.897994 5.1283 1.13416 5.08926L4.6529 4.5024L6.42699 0.954349C6.53643 0.736116 6.77643 0.59212 7.00299 0.60044C7.24683 0.60172 7.46827 0.741236 7.57515 0.960749L9.27372 4.44992L12.8718 5.09054C13.1067 5.13214 13.2987 5.3011 13.3704 5.52829C13.4421 5.75612 13.3813 6.00443 13.2123 6.17275L10.8782 8.50676L11.4734 12.6692C11.5067 12.906 11.4069 13.1415 11.2123 13.2804C11.0184 13.4199 10.7624 13.4384 10.5505 13.3309L7.04459 11.5556L3.44329 13.3335C3.35369 13.3783 3.25641 13.4 3.15977 13.4Z"
            fill="#E71A4B"
        />
    </svg>,
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 1.66031V8.92857C0 9.52031 0.402944 10 0.9 10H11.1C11.5971 10 12 9.52031 12 8.92857V1.66024L6.30227 5.61699C6.11546 5.74673 5.88445 5.74673 5.69763 5.61699L0 1.66031Z"
            fill="#E71A4B"
        />
        <path d="M11.666 0.238333C11.5114 0.0892854 11.3144 0 11.1 0H0.9C0.685537 0 0.488595 0.0893014 0.333979 0.238373L5.99995 4.17308L11.666 0.238333Z" fill="#E71A4B" />
    </svg>,
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4768 0.139768C4.05427 0.969416 2.25439 1.53729 0.896013 1.72726C0.402948 1.79621 -0.00112741 2.20149 9.92451e-06 2.69954L0.000690584 2.99761C-0.0175655 6.62317 0.287096 9.79665 5.67808 11.9396C5.88077 12.0201 6.11247 12.0201 6.31518 11.9396C11.7106 9.79674 12.0169 6.62321 11.9986 2.99761L11.9985 2.69696C11.9982 2.19992 11.5945 1.79114 11.1037 1.71411C9.81486 1.51184 7.93472 0.949895 6.51367 0.137205C6.19318 -0.0460842 5.79573 -0.0462361 5.4768 0.139768ZM8.22295 5.22631C8.45726 4.9919 8.45726 4.61186 8.22295 4.37745C7.98863 4.14304 7.60873 4.14304 7.37442 4.37745L5.39868 6.35396L4.62295 5.57792C4.38863 5.34351 4.00873 5.34351 3.77442 5.57792C3.5401 5.81233 3.5401 6.19238 3.77442 6.42678L4.97442 7.62725C5.20873 7.86166 5.58863 7.86166 5.82295 7.62725L8.22295 5.22631Z"
            fill="#E71A4B"
        />
    </svg>
];

function StoreCredibility({ listInstallApp, isLoading, isError, onClickResync }: StoreCredibilityType) {
    const { t } = useTranslation();

    const interval = useRef<NodeJS.Timer | undefined>(undefined);
    const [countPoint, setCountPoint] = useState(0);

    const displaySpeed = () => {
        if (listInstallApp?.length === 0) {
            return {
                speed: 30,
                appCredibility: 'not_install',
                color: 'speed_0_19'
            };
        }

        if (listInstallApp.includes('Alireview' as DataInstallAppType) || listInstallApp.includes('alireview')) {
            return {
                speed: 100,
                appCredibility: 'install_alireview',
                color: 'speed_61_100'
            };
        }

        return {
            speed: 60,
            appCredibility: listInstallApp.length >= 2 ? 'install_multiple' : `install_${listInstallApp[0].toLowerCase()}`,
            color: 'speed_40_60'
        };
    };

    const getValueInConstant = (type?: string) => {
        if (type === 'color') {
            return STORE_CREDIBILITY_MESSAGE[displaySpeed().color];
        }

        if (type === 'message') {
            return STORE_CREDIBILITY_MESSAGE[displaySpeed().appCredibility].message;
        }

        return STORE_CREDIBILITY_MESSAGE[displaySpeed().appCredibility];
    };

    const onClickButton = (name: 'open' | 'explore' | string) => {
        if (name === 'open') return window.open('https://app.alireviews.io/', '_blank');
        if (name === 'explore') return window.open('https://apps.shopify.com/ali-reviews?utm_source=transcy&utm_medium=in-app-score', '_blank');

        return window.open('https://ali-reviews-fireapps.myshopify.com/products/charmsmic-new-striped', '_blank');
    };

    useEffect(() => {
        if (isLoading) {
            if (countPoint !== 0) {
                setCountPoint(0);
            }
            return;
        }

        interval.current = setInterval(() => {
            setCountPoint((prev) => {
                if (prev >= 100) return prev;
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval.current);
    }, [isLoading]);

    useEffect(() => {
        if (listInstallApp === null) return;

        if (countPoint >= 100 || countPoint === displaySpeed().speed) return clearInterval(interval.current);
    }, [countPoint, listInstallApp]);

    useEffect(() => {
        if (isLoading === true && listInstallApp === null) setCountPoint(0);
    }, [isLoading, listInstallApp]);

    return (
        <div className={`${styles.item}`}>
            {isLoading && !isError && (
                <div>
                    <SkeletonDisplayText size="medium" />
                    <SkeletonBodyText lines={10} />
                </div>
            )}

            {isError && (
                <EmptyState image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png">
                    <p>Something when wrong</p>
                </EmptyState>
            )}

            {!isLoading && !isError && (
                <Fragment>
                    <div className={styles.content}>
                        <div className={styles.body}>
                            {/* <div className={styles.boxLeft_StoreCredibilityWrapper}>
                <div className={styles.boxLeft_StoreCredibility}>
                  <div className={styles.boxLeft_score_circle}>
                    <p
                      className={`${styles.boxLeft_point} ${
                        styles[`${getValueInConstant('color').score_color}`]
                      }`}
                    >
                      {parseInt(`${countPoint}`)}
                    </p>
                  </div>
                  <Circle
                    className={styles.boxLeft_progress}
                    percent={100}
                    strokeWidth={10}
                    trailWidth={10}
                    strokeColor={getValueInConstant('color').color}
                  />
                  <div
                    className={`${styles.boxLeft_badge_StoreCredibility} ${
                      styles[`${getValueInConstant('color').backdrop}`]
                    }`}
                  >
                    {displaySpeed().speed > 30
                      ? t('home_page.store_credibility_component.credibility')
                      : t(
                          'home_page.store_evaluation_component.box_feat2.online_review_title'
                        )}
                  </div>
                </div>
                <div
                  className={styles.boxLeft_StoreCredibilityResync}
                  onClick={onClickResync}
                >
                  <ReEvaluationIcon />
                </div>
              </div> */}

                            <div className={styles.boxLeft__StoreCredibilityWrapper1}>
                                <div className={styles.boxLeft__boxChart}>
                                    <Circle
                                        // className={styles.boxLeft_progress}
                                        percent={100}
                                        strokeWidth={10}
                                        trailWidth={10}
                                        strokeColor={getValueInConstant('color').color}
                                    />

                                    <div className={styles.boxLeft__boxPoint}>
                                        <p className={`${styles.boxLeft_point} ${styles[`${getValueInConstant('color').score_color}`]}`}>{parseInt(`${countPoint}`)}</p>
                                    </div>

                                    <div className={styles.bgrBackdrop}></div>
                                    <div className={styles.boxLeft_resync} onClick={onClickResync}>
                                        <ReEvaluationIcon />
                                    </div>
                                </div>

                                <div className={`${styles.boxLeft_badge_StoreCredibility1} ${styles[`${getValueInConstant('color').backdrop}`]}`}>
                                    {displaySpeed().speed > 30 ? t('home_page.store_credibility_component.credibility') : t('home_page.store_evaluation_component.box_feat2.online_review_title')}
                                </div>
                            </div>

                            <div className={styles.boxRight}>
                                <h2 className={styles.title}>{t(getValueInConstant().title)}</h2>
                                {Object.values(getValueInConstant('message'))?.map((message: any, index) => (
                                    <div key={t(message)} className={styles.boxRight__row}>
                                        <div className={`${styles.boxRight__icon} ${styles[`${getValueInConstant('color').color_icon}`]}`}>{STORE_ICONS[index]}</div>
                                        <div className={styles.boxRight__text}>{t(message)}</div>
                                    </div>
                                ))}
                                {getValueInConstant()?.des && (
                                    <p className={styles.text}>
                                        {t(getValueInConstant()?.des)}
                                        <span style={{ paddingLeft: 2 }}>
                                            <Link removeUnderline external url="https://ali-reviews-fireapps.myshopify.com/products/charmsmic-new-striped">
                                                {t('home_page.store_credibility_component.common.btn_view')}
                                            </Link>
                                        </span>
                                    </p>
                                )}
                                {displaySpeed().speed === 100 ? (
                                    <div className={styles.footer}>
                                        <button onClick={() => onClickButton('open')} className={`${styles.btn} ${styles['btn--outline']}`}>
                                            {t('home_page.store_credibility_component.common.btn_open')}
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.footer}>
                                        <button onClick={() => onClickButton('explore')} className={`${styles.btn} ${styles['btn--outline']}`}>
                                            {t('home_page.store_credibility_component.common.btn_explore')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default StoreCredibility;
