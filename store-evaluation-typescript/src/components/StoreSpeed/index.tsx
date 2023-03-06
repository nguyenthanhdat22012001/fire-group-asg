/* Packages */
import { Circle } from 'rc-progress';
import React, { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState, SkeletonBodyText, SkeletonDisplayText, Link } from '@shopify/polaris';

import ReEvaluationIcon from '../../assets/re-evaluationIcon.svg';

/* Styles */
import styles from '../styles.module.css';

/* Constants */
import STORE_EVALUATION_SPEED_MESSAGE from './constants';
import { StoreSpeedType } from './type';

const STORE_ICONS = [
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 12C2.6916 12 0 9.3084 0 6C0 2.6916 2.6916 0 6 0C9.3084 0 12 2.6916 12 6C12 9.3084 9.3084 12 6 12ZM6.6 3C6.6 2.66863 6.33137 2.4 6 2.4C5.66863 2.4 5.4 2.66863 5.4 3V3.10236C4.70077 3.34937 4.2 4.01603 4.2 4.8C4.2 5.40806 4.41587 5.86191 4.815 6.16125C5.13916 6.40437 5.54385 6.5049 5.81482 6.57221L5.85448 6.58209C6.18456 6.66461 6.35539 6.71654 6.465 6.79875C6.51587 6.8369 6.6 6.90806 6.6 7.2C6.6 7.52835 6.33691 7.79469 6.00982 7.79992C6.00469 7.7995 5.99516 7.79857 5.98173 7.79666C5.94763 7.79178 5.88937 7.78067 5.81474 7.75579C5.66756 7.70673 5.45097 7.60244 5.22426 7.37574C4.98995 7.14142 4.61005 7.14142 4.37574 7.37574C4.14142 7.61005 4.14142 7.98995 4.37574 8.22426C4.73469 8.58322 5.10299 8.77797 5.4 8.88215V9C5.4 9.33137 5.66863 9.6 6 9.6C6.33137 9.6 6.6 9.33137 6.6 9V8.89764C7.29923 8.65063 7.8 7.98397 7.8 7.2C7.8 6.59194 7.58413 6.1381 7.185 5.83875C6.86085 5.59563 6.45616 5.4951 6.18519 5.42779L6.14552 5.41791C5.81544 5.33539 5.64462 5.28346 5.535 5.20125C5.48413 5.1631 5.4 5.09194 5.4 4.8C5.4 4.47165 5.66309 4.20531 5.99018 4.20008C5.99531 4.2005 6.00484 4.20143 6.01827 4.20334C6.05237 4.20822 6.11063 4.21933 6.18526 4.24421C6.33244 4.29327 6.54903 4.39756 6.77574 4.62426C7.01005 4.85858 7.38995 4.85858 7.62426 4.62426C7.85858 4.38995 7.85858 4.01005 7.62426 3.77574C7.26531 3.41678 6.89701 3.22203 6.6 3.11785V3Z"
            fill="#FAAD14"
        />
    </svg>,
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.0002 5.39998C7.32568 5.39998 8.4002 4.32546 8.4002 2.99998C8.4002 1.67449 7.32568 0.599976 6.0002 0.599976C4.67471 0.599976 3.6002 1.67449 3.6002 2.99998C3.6002 4.32546 4.67471 5.39998 6.0002 5.39998Z"
            fill="#E71A4B"
        />
        <path
            d="M1.2002 9.59997C1.2002 10.5941 2.00608 11.4 3.0002 11.4H9.0002C9.99431 11.4 10.8002 10.5941 10.8002 9.59997C10.8002 8.60586 9.9002 6.59998 6.0002 6.59998C2.1002 6.59998 1.2002 8.60586 1.2002 9.59997Z"
            fill="#E71A4B"
        />
    </svg>,
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.34632 1.69634L1.00785 3.68644C0.950262 4.02507 1.21673 4.33333 1.56705 4.33333H2.07301C2.3951 4.33333 2.68955 4.155 2.83359 3.87268L3.16546 3.22222L3.49734 3.87268C3.64138 4.155 3.93583 4.33333 4.25792 4.33333H4.90754C5.22963 4.33333 5.52408 4.155 5.66813 3.87268L6 3.22222L6.33187 3.87268C6.47592 4.155 6.77037 4.33333 7.09246 4.33333H7.74208C8.06417 4.33333 8.35862 4.155 8.50266 3.87268L8.83454 3.22222L9.16641 3.87268C9.31045 4.155 9.6049 4.33333 9.927 4.33333H10.433C10.7833 4.33333 11.0497 4.02507 10.9921 3.68644L10.6537 1.69634C10.5853 1.29451 10.2306 1 9.81489 1H2.18511C1.76942 1 1.41465 1.29451 1.34632 1.69634Z"
            fill="#E71A4B"
        />
        <path
            d="M8.0595 5.60716C8.27646 5.82412 8.27646 6.17588 8.0595 6.39284L5.83728 8.61506C5.62032 8.83202 5.26857 8.83202 5.05161 8.61506L3.9405 7.50395C3.72354 7.28699 3.72354 6.93523 3.9405 6.71827C4.15745 6.50132 4.50921 6.50132 4.72617 6.71827L5.44444 7.43655L7.27383 5.60716C7.49079 5.39021 7.84255 5.39021 8.0595 5.60716Z"
            fill="#E71A4B"
        />
        <path d="M2.66667 5.44444H1.55556V10.1667C1.55556 10.6269 1.92865 11 2.38889 11H9.61111C10.0713 11 10.4444 10.6269 10.4444 10.1667V5.44444H9.33333V9.88889H2.66667V5.44444Z" fill="#E71A4B" />
    </svg>
];

function StoreSpeed({ point = 0, totalOrder, isLoading, isError, onClickFixSpeed, onClickChatWittUs, onClickResync }: StoreSpeedType) {
    const { t } = useTranslation();

    const interval = useRef<NodeJS.Timer | undefined>(undefined);
    const [countPoint, setCountPoint] = useState(0);

    const displaySpeed = () => {
        const prefix = 'speed';

        if (point <= 19) return `${prefix}_0_19`;
        if (point <= 39) return `${prefix}_20_39`;
        if (point <= 60) return `${prefix}_40_60`;
        if (point <= 100) return `${prefix}_61_100`;

        return `${prefix}_${`0_19`}`;
    };

    const displayOrder = () => {
        const prefix = 'order';

        if (totalOrder <= 100) return `${prefix}_100`;
        if (totalOrder <= 300) return `${prefix}_300`;
        if (totalOrder <= 500) return `${prefix}_500`;
        if (totalOrder <= 1000) return `${prefix}_1000`;
        if (totalOrder > 1000) return `${prefix}_more_1000`;

        return `${prefix}_${`100`}`;
    };

    const getStoreEvaluationSpeedMessage = (type?: string) => {
        if (type === 'title' || type === 'color') return STORE_EVALUATION_SPEED_MESSAGE[displaySpeed()];

        return STORE_EVALUATION_SPEED_MESSAGE[displaySpeed()][displayOrder()];
    };

    const onClickFixSpeedIssue = () => {
        if (displaySpeed() === 'speed_40_60') {
            onClickChatWittUs();
            return;
        }

        onClickFixSpeed();
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
        if (isLoading) return;

        if (countPoint >= 100 || countPoint === point) return clearInterval(interval.current);
    }, [countPoint, point]);

    useEffect(() => {
        if (isLoading === true && point === null) setCountPoint(0);
    }, [isLoading, point]);

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
                            {/* <div className={styles.boxLeftWrapper}>
                <div className={styles.boxLeft}>
                  <div className={styles.boxLeft_score_circle}>
                    <p
                      className={`${styles.boxLeft_point} ${
                        styles[
                          `${
                            getStoreEvaluationSpeedMessage('color').score_color
                          }`
                        ]
                      }`}
                    >
                      {countPoint}
                    </p>
                  </div>
                  <Circle
                    className={styles.boxLeft_progress}
                    gapDegree={80}
                    percent={Number(countPoint) || 0}
                    strokeWidth={10}
                    trailWidth={10}
                    strokeColor={getStoreEvaluationSpeedMessage('color').color}
                  />

                  <div
                    className={`${styles.boxLeft_badge} ${
                      styles[
                        `${getStoreEvaluationSpeedMessage('color').backdrop}`
                      ]
                    }`}
                  >
                    {t(
                      'home_page.store_evaluation_component.box_feat1.store_speed_title'
                    )}
                  </div>

                  <div className={styles.boxLeft_textBy}>
                    <img
                      src='https://res.cloudinary.com/dtaxsh0k0/image/upload/v1665972813/croped_itprjq.png'
                      alt='Google PageSpeed'
                    />
                    <p>by Google PageSpeed</p>
                  </div>
                </div>
                <div className={styles.boxLeft_resync} onClick={onClickResync}>
                  <ReEvaluationIcon />
                </div>
              </div> */}

                            <div className={styles.boxLeft__boxScoreSpeed}>
                                <div className={styles.boxLeft__StoreCredibilityWrapper1}>
                                    <div className={styles.boxLeft__boxChart}>
                                        <Circle
                                            // className={styles.boxLeft_progress}
                                            gapDegree={80}
                                            percent={Number(countPoint) || 0}
                                            strokeWidth={10}
                                            trailWidth={10}
                                            strokeColor={getStoreEvaluationSpeedMessage('color').color}
                                        />

                                        <div className={styles.boxLeft__boxPoint}>
                                            <p className={`${styles.boxLeft_point} ${styles[`${getStoreEvaluationSpeedMessage('color').score_color}`]}`}>{countPoint}</p>
                                        </div>

                                        <div className={styles.bgrBackdrop}></div>
                                        <div className={styles.boxLeft_resync} onClick={onClickResync}>
                                            <ReEvaluationIcon />
                                        </div>
                                    </div>

                                    <div className={`${styles.boxLeft_badge_StoreCredibility1} ${styles[`${getStoreEvaluationSpeedMessage('color').backdrop}`]}`}>
                                        {t('home_page.store_evaluation_component.box_feat1.store_speed_title')}
                                    </div>

                                    <div className={styles.boxLeft_textBy}>
                                        <img src="https://res.cloudinary.com/dtaxsh0k0/image/upload/v1665972813/croped_itprjq.png" alt="Google PageSpeed" />
                                        <p>by Google PageSpeed</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.boxRight}>
                                <h2 className={styles.title}>{t(getStoreEvaluationSpeedMessage('title').title)}</h2>
                                {Object.values(getStoreEvaluationSpeedMessage())?.map((message: any, index) => (
                                    <div key={message} className={styles.boxRight__row}>
                                        <div className={`${styles.boxRight__icon} ${styles[`${getStoreEvaluationSpeedMessage('color').color_icon}`]}`}>{STORE_ICONS[index]}</div>
                                        <div className={styles.boxRight__text}>{t(message)}</div>
                                    </div>
                                ))}
                                {getStoreEvaluationSpeedMessage('title')?.fa_experts && (
                                    <p className={styles.text}>
                                        {t(getStoreEvaluationSpeedMessage('title')?.fa_experts)}{' '}
                                        {getStoreEvaluationSpeedMessage('title').btn_learn && (
                                            <span style={{ paddingLeft: 2 }}>
                                                <Link removeUnderline external url="https://help.onecommerce.io/article/6250148e9c7cf413cd74cc40">
                                                    {t(getStoreEvaluationSpeedMessage('title').btn_learn)}
                                                </Link>
                                            </span>
                                        )}
                                    </p>
                                )}
                                <div className={styles.footer} style={displaySpeed() == 'speed_61_100' ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                                    {getStoreEvaluationSpeedMessage('title').btn && (
                                        <button onClick={onClickFixSpeedIssue} className={`${styles.btn} ${styles['btn--outline']}`}>
                                            {t(getStoreEvaluationSpeedMessage('title').btn)}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default StoreSpeed;
