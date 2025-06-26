const KEY = 'army-list-data';

export function extractArmyListBase64FromUrl(urlString) {
    const baseUrl = new URL(urlString);
    const hash = baseUrl.hash.slice(1);
    const proxyUrl = baseUrl.origin + '?' + hash;
    const url = new URL(proxyUrl);
    const params = url.searchParams;
    if (params.has(KEY)) {
        return params.get(KEY);
    }
}
export function decodeArmyListJsonFromUrl(urlString) {
    const base64String = extractArmyListBase64FromUrl(urlString);
    const jsonString = decodeBase64(base64String)
    return JSON.parse(jsonString);
}

export function makeArmyListDataUrl(data) {
    const jsonString = JSON.stringify(data);
    const encodedJson = encodeBase64(jsonString);

    return `${window.location.origin}#${KEY}=${encodedJson}`;
}

function encodeBase64(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    const encoder = new TextEncoder();
    const encodedBytes = encoder.encode(jsonString);

    return btoa(String.fromCharCode(...encodedBytes));
}

export function decodeBase64(base64EncodedBinary) {
    const decodedBytes = Uint8Array.from(
        atob(base64EncodedBinary)
            .split('')
            .map(char => char.charCodeAt(0)),
    );
    const decoder = new TextDecoder();
    const decodedString = decoder.decode(decodedBytes);

    return JSON.parse(decodedString);
}