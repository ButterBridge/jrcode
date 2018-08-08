import React from 'react'
import PT from 'prop-types'
import { IconHolder, Opener } from '../styled-components';

function Icon ({link, ...imgProps}) {
    return (
        <Opener>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <IconHolder {...imgProps} />
            </a>
        </Opener>
    )
}

export default Icon;

Icon.proptypes = {
    link : PT.string.isRequired,
    src : PT.object.isRequired,
    alt : PT.string.isRequired
}