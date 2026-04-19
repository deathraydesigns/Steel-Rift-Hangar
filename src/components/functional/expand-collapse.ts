import {inject, provide, ref, watch} from 'vue';

export function useExpandCollapseAll() {

    const injectedCollapseSignal = inject('collapseSignal', ref(''));
    const injectedExpandSignal = inject('expandSignal', ref(''));

    const collapseSignal = ref('');
    const expandSignal = ref('');

    watch(injectedCollapseSignal, () => collapseSignal.value = injectedCollapseSignal.value);
    watch(injectedExpandSignal, () => expandSignal.value = injectedExpandSignal.value);

    provide('collapseSignal', collapseSignal);
    provide('expandSignal', expandSignal);

    function collapseAll() {
        collapseSignal.value = Date.now();
    }

    function expandAll() {
        expandSignal.value = Date.now();
    }

    return {
        collapseSignal,
        expandSignal,
        collapseAll,
        expandAll,
    };
}