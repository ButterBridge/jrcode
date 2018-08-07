import React from 'react'
import PT from 'prop-types'
import { IconHolder } from '../styled-components';

function Icon ({link, ...imgProps}) {
    return (
        <span>
            <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            >
                <IconHolder {...imgProps} />
            </a>

        </span>
    )
}

export default Icon;

Icon.proptypes = {
    link : PT.string.isRequired,
    src : PT.object.isRequired,
    alt : PT.string.isRequired
}