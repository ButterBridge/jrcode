import { difference } from 'lodash';

export const areAllEqual = array => {
  return array.every(item => item === array[0]);
}

export const areEquivalent = (array1, array2) => {
  return !difference(array2, array1).length
}

export const doNothing = () => { };

export const removeHyphens = (str) => {
  return str.replace(/\-/g, ' ');
}

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const fillNewEmptyArray = (size, mapCb) => {
  return Array(size).fill().map(mapCb);
}