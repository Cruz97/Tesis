export const cutHex = h => (h.charAt(0) === '#' ? h.substring(1, 7) : h);
export const hexToR = h => parseInt(cutHex(h).substring(0, 2), 16);
export const hexToG = h => parseInt(cutHex(h).substring(2, 4), 16);
export const hexToB = h => parseInt(cutHex(h).substring(4, 6), 16);
export const hexToRGB = h => `rgb(${hexToR(h)},${hexToG(h)},${hexToB(h)})`;
export const hexToRGBA = (h, opacity = 1) =>
  `rgba(${hexToR(h)},${hexToG(h)},${hexToB(h)},${opacity})`;
