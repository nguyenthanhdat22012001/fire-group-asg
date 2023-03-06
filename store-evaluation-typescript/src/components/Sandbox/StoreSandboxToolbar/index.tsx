import React from 'react';
import { Stack, TextField, Checkbox } from '@shopify/polaris';
import { SandboxToolbarType } from '../type';

const SandboxToolbar = ({ pageSpeed, onChangePageSpeed, isAppChecked, onChangeSandboxInstallApp, totalOrder, onChangeTotalOrder }: SandboxToolbarType) => {
    return (
        <Stack vertical>
            <Stack>
                <TextField label="Page Speed" type="number" value={pageSpeed} onChange={onChangePageSpeed} autoComplete="off" />

                <TextField label="Total order" type="number" value={totalOrder} onChange={onChangeTotalOrder} autoComplete="off" />
            </Stack>

            <div>
                <label>Install app</label>
                <Stack>
                    <Checkbox label="yotpo" checked={isAppChecked('yotpo')} onChange={() => onChangeSandboxInstallApp('yotpo')} />
                    <Checkbox label="loox" checked={isAppChecked('loox')} onChange={() => onChangeSandboxInstallApp('loox')} />
                    <Checkbox label="judgeme" checked={isAppChecked('judgeme')} onChange={() => onChangeSandboxInstallApp('judgeme')} />
                    <Checkbox label="fera" checked={isAppChecked('fera')} onChange={() => onChangeSandboxInstallApp('fera')} />
                    <Checkbox label="automizely" checked={isAppChecked('automizely')} onChange={() => onChangeSandboxInstallApp('automizely')} />
                    <Checkbox label="alireview" checked={isAppChecked('alireview')} onChange={() => onChangeSandboxInstallApp('alireview')} />
                </Stack>
            </div>
        </Stack>
    );
};

export default SandboxToolbar;
