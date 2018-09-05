import {difference} from 'lodash';

export const areAllEqual = array => {
    return array.every(item => item === array[0]);
}

export const areEquivalent = (array1, array2) => {
    return !difference(array2, array1).length
}

export const doNothing = () => {};

export const removeHyphens = (str) => {
    return str.replace(/\-/g, ' ');
}