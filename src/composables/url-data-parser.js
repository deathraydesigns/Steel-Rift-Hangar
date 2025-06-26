import {ROUTE_ARMY_LIST_DATA, router} from '../router.js';

export function makeArmyListDataUrl(data) {
    const jsonString = JSON.stringify(data);
    const encodedJson = encodeBase64(jsonString);

    const route = router.resolve({
        name: ROUTE_ARMY_LIST_DATA,
        query: {payload: encodedJson},
    });

    const base = window.location.origin + import.meta.env.BASE_URL;
    return new URL(route.href, base).href;
}

export function urlDataStringToJson(dataString) {
    const jsonString = decodeBase64(dataString);
    return JSON.parse(jsonString);
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