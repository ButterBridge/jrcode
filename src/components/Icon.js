import React from 'react'
import PT from 'prop-types'
import { IconHolder, Option } from '../styled-components';

function Icon ({link, ...imgProps}) {
    return (
        <Option>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <IconHolder {...imgProps} />
            </a>
        </Option>
    )
}

export default Icon;

Icon.proptypes = {
    link : PT.string.isRequired,
    src : PT.object.isRequired,
    alt : PT.string.isRequired
}