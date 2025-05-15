import {computed} from 'vue';

export function getter(target) {
    return computed(() => target);
}