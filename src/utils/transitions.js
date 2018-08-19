const getTransitionStyles = timeout => ({
    fade : {
        entering: {
            opacity: 0,
        },
        entered: {
            transition: `opacity ${timeout}ms ease-in-out`,
            opacity: 1,
        },
        exited: {
            transition: `opacity ${timeout}ms ease-in-out`,
            opacity: 0,
        }, 
    },

    slide : {
        entering: {
            transform: 'translateX(-100%)'
        },
        entered: {
            transition: `transform ${timeout}ms`,
            transform: 'translateX(0%)'
        },
        exited: {
            transform: 'translateX(0%)'
        }
    },

    descend : {
        entering: {
            transform: 'translateY(-100%)'
        },
        entered: {
            transition: `transform ${timeout}ms`,
            transform: 'translateY(0%)'
        },
        exited: {
            transform: 'translateY(0%)'
        }
    }
})

const composeTransitionStyles = ({ timeout, status, actions }) => {
    const {elements, transitions} = actions.reduce((acc, action) => {
        acc.elements = {
            ...acc.elements,
            ...getTransitionStyles()[action][status]
        };
        acc.transitions.push(getTransitionStyles(timeout)[action][status].transition || '');
        return acc;
    }, {
        elements: {},
        transitions : []
    });
    
    elements.transition = transitions.join();

    return elements;
}
    
export default composeTransitionStyles;