import React from 'react';
import {Bullet} from '../../styled-components';

export const withBullet = (Component) => {
    return ({componentContent, addition, colour, classTag = 'main', ...props}) => {
        return <div style={{display : 'block'}}>
            <div className={`grid-${addition}`}>
                <Bullet 
                    colour={colour}
                    className={`grid-${addition}-bullet`}
                />
                <Component
                    className={`grid-${addition}-${classTag}`}
                    {...props}
                >
                    {componentContent}
                </Component>
            </div>
        </div>
    }
}