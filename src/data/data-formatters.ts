export const numberFormater = (name: string, number: number | string | undefined): string => {
    return `${name}(${number})`;
};

export const inchFormater = (name: string, number: number | string | undefined): string => {
    return `${name}(${number}")`;
};
