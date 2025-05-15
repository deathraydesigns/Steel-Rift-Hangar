import {defineStore} from 'pinia';
import {reactive} from 'vue';

export const useToastStore = defineStore('toast', () => {

    let messageIdIncrement = 0;

    const messages = reactive([]);

    function $reset() {
        messages.value = [];
    }

    function toastMessage({
                              title,
                              body = null,
                              pos = 'top-end',
                              value = 10000,
                              variant = null,
                              textVariant = null,
                              progressVariant = 'info',
                          }) {
        messages.push({
            id: messageIdIncrement++,
            title,
            body,
            pos,
            value,
            variant,
            textVariant,
            progressProps: {
                variant: progressVariant,
            },
        });
    }

    function toastInfo(title, body = null) {
        toastMessage({
            title,
            body,
        });
    }

    function toastError(text, body = null) {
        toastMessage({
            title: text,
            body,
            textVariant: 'danger',
            progressVariant: 'danger',

        });
    }

    return {
        toastMessage,
        toastInfo,
        toastError,
        messages,
        $reset,
    };
});