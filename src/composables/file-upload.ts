import { toaster } from '../toaster.js';

export function jsonFileParser(cb: (data: {}) => void) {
    return (event: Event) => {
        const target = event.target as HTMLInputElement;

        const file = target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {

                    cb(JSON.parse(e.target?.result as string));

                } catch (error) {
                    toaster().error('Invalid Save File', error as string);
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };
}