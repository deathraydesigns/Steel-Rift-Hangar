export function formatInches(value) {
    if (value) {
        return value + '"';
    }
    return '-';
}

export function formatCardRef(value) {
    if (value) {
        return '#' + value;
    }
}