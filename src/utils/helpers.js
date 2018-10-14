import { difference } from "lodash";

export const areAllEqual = array => array.every(item => item === array[0]);

export const areEquivalent = (array1, array2) =>
  !difference(array2, array1).length;

export const doNothing = () => {};

export const removeHyphens = str => str.replace(/-/g, " ");

export const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

export const fillNewEmptyArray = (size, mapCb) =>
  Array(size)
    .fill()
    .map(mapCb);

export const getDocHeight = document =>
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

export const getAmountScrolled = (window, document) => {
  const windowHeight =
    window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
  const documentHeight = getDocHeight(document);
  const scrollTop =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
  const trackLength = documentHeight - windowHeight;
  return Math.floor((scrollTop / trackLength) * 100);
};

export const encode = data =>
  Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
