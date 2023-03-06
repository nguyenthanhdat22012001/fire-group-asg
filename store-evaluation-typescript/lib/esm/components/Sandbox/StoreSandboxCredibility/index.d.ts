/// <reference types="react" />
import PropTypes from 'prop-types';
import { StoreSandboxCredibilityType } from '../type';
declare function StoreCredibility({ listInstallApp, isLoading, isError }: StoreSandboxCredibilityType): JSX.Element;
declare namespace StoreCredibility {
    var propTypes: {
        listInstallApp: PropTypes.Requireable<any[]>;
    };
}
export default StoreCredibility;
