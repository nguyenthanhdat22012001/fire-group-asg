import React from 'react';
import { Stack, TextField, Checkbox } from '@shopify/polaris';
const SandboxToolbar = ({ pageSpeed, onChangePageSpeed, isAppChecked, onChangeSandboxInstallApp, totalOrder, onChangeTotalOrder }) => {
    return (React.createElement(Stack, { vertical: true },
        React.createElement(Stack, null,
            React.createElement(TextField, { label: "Page Speed", type: "number", value: pageSpeed, onChange: onChangePageSpeed, autoComplete: "off" }),
            React.createElement(TextField, { label: "Total order", type: "number", value: totalOrder, onChange: onChangeTotalOrder, autoComplete: "off" })),
        React.createElement("div", null,
            React.createElement("label", null, "Install app"),
            React.createElement(Stack, null,
                React.createElement(Checkbox, { label: "yotpo", checked: isAppChecked('yotpo'), onChange: () => onChangeSandboxInstallApp('yotpo') }),
                React.createElement(Checkbox, { label: "loox", checked: isAppChecked('loox'), onChange: () => onChangeSandboxInstallApp('loox') }),
                React.createElement(Checkbox, { label: "judgeme", checked: isAppChecked('judgeme'), onChange: () => onChangeSandboxInstallApp('judgeme') }),
                React.createElement(Checkbox, { label: "fera", checked: isAppChecked('fera'), onChange: () => onChangeSandboxInstallApp('fera') }),
                React.createElement(Checkbox, { label: "automizely", checked: isAppChecked('automizely'), onChange: () => onChangeSandboxInstallApp('automizely') }),
                React.createElement(Checkbox, { label: "alireview", checked: isAppChecked('alireview'), onChange: () => onChangeSandboxInstallApp('alireview') })))));
};
export default SandboxToolbar;
//# sourceMappingURL=index.js.map