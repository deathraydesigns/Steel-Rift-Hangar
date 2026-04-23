import type { TraitFormatter } from '../types';

export const xFormater: TraitFormatter = (name, x): string => {
    return `${name}(${x})`;
};
export const xyFormater: TraitFormatter = (name, x, y): string => {
    return `${name}(${x}, ${y})`;
};

export const inchFormater: TraitFormatter = (name: string, number: number | string | undefined): string => {
    return `${name}(${number}")`;
};
