import React from 'react';
import Transition from '../../components/Transition';

export const withTransition = (Component) => {
    return ({linkTo, ...props}) => {
        return <Transition>
            <Component {...props}/>
        </Transition>
    }
}