import React, { Fragment } from 'react';

import {Button} from '@material-ui/core';
import OneSlot from './oneSlot'
const noRad = {borderRadius:"0"};

export default function LivePreviewExample(props) {
    return (
        <Fragment>
            <td className="p-2 m-0">
                { props.slotContents.map(slot => (
                    <OneSlot />
                )) }
            </td>
        </Fragment>
    );
}