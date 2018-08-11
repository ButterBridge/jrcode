import React from 'react';
import {Bullet} from '../../styled-components';

export const withBullet = (Component) => {
    return ({componentContent, addition, colour, ...props}) => {
        return <div className={`grid-${addition}`}>
            <Bullet 
                colour={colour}
                className={`grid-${addition}-bullet`}
            />
            <Component
                className={`grid-${addition}-main`}
                {...props}
            >
                {componentContent}
            </Component>
        </div>
    }
}