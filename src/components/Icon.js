import React from 'react'
import PT from 'prop-types'

function Icon ({link, ...imgProps}) {
    return (
        <a
          className="navbar-item"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img {...imgProps} />
          </span>
        </a>
    )
}

export default Icon;

Icon.proptypes = {
    link : PT.string.isRequired,
    src : PT.object.isRequired,
    alt : PT.string.isRequired
}