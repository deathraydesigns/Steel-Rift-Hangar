import {toaster} from '../toaster.js';

export function jsonFileParser(cb) {
    return (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {

                    cb(JSON.parse(e.target.result));

                } catch (error) {
                    toaster().error('Invalid Save File', error);
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };
}

export const IMPORT_PREFIX = 'import';