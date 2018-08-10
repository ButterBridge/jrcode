import React from 'react';
import {Bullet} from '../../styled-components';

export const withBullet = (Component) => {
    return ({componentContent, colour, ...props}) => {
        return <div className="grid-title">
            <Bullet 
                colour={colour}
                className="grid-title-bullet"
            />
            <Component
                className="grid-title-main"
                {...props}
            >
                {componentContent}
            </Component>
        </div>
    }
}