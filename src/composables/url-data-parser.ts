import { ROUTE_HOME, router } from '../router.js';

export function makeArmyListDataUrl(data: unknown): string {
    const encodedJson = encodeBase64(data);

    const route = router.resolve({
        name: ROUTE_HOME,
        query: { payload: encodedJson },
    });

    const base = window.location.origin + import.meta.env.BASE_URL;
    return new URL(route.href, base).href;
}

export function urlDataStringToJson<T = unknown>(dataString: string): T {
    return decodeBase64(dataString) as T;
}

function encodeBase64(data: unknown): string {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const encodedBytes = encoder.encode(jsonString);
    return btoa(String.fromCharCode(...encodedBytes));
}

export function decodeBase64(base64EncodedBinary: string): unknown {
    const decodedBytes = Uint8Array.from(
        atob(base64EncodedBinary)
            .split('')
            .map((char) => char.charCodeAt(0)),
    );

    const decoder = new TextDecoder();
    const decodedString = decoder.decode(decodedBytes);
    return JSON.parse(decodedString);
}