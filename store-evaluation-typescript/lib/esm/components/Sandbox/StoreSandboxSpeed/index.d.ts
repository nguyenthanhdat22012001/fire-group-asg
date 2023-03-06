/// <reference types="react" />
import PropTypes from 'prop-types';
import { StoreSandboxSpeedtype } from '../type';
declare function StoreSpeed({ point, totalOrder, isLoading, isError, onClickFixSpeed, onClickChatWittUs }: StoreSandboxSpeedtype): JSX.Element;
declare namespace StoreSpeed {
    var propTypes: {
        point: PropTypes.Requireable<number>;
        totalOrder: PropTypes.Requireable<any>;
        token: PropTypes.Requireable<any>;
    };
}
export default StoreSpeed;
