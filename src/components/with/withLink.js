import React from 'react';
import Link from 'gatsby-link'

export const withLink = (Component) => {
    return ({linkTo, ...props}) => {
        return <Link to={linkTo}>
            <Component {...props}/>
        </Link>
    }
}