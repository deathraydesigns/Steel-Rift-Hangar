export function formatCardRef(value?: string | number | undefined | null) {
    if (value) {
        return '#' + value;
    }
}