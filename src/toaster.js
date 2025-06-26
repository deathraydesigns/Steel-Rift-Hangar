import {useToastController} from 'bootstrap-vue-next';
import {defineStore} from 'pinia';

// needs to be defined as a pinia store to allow calling toasts from other stores not sure why
export const toaster = defineStore('toaster', () => {

    const {create} = useToastController();

    function message({
                         title,
                         body = null,
                         bodyClass,
                         pos = 'top-end',
                         modelValue = 10000,
                         variant = null,
                         textVariant = null,
                         progressVariant = 'info',
                     }) {

        create({
            title,
            body,
            bodyClass,
            pos,
            modelValue,
            variant,
            textVariant,
            progressProps: {
                variant: progressVariant,
            },
        });
    }

    function info(title, body = null) {
        message({
            title,
            body,
        });
    }

    function error(text, body = null) {
        message({
            bodyClass: 'toast-body-error',
            modelValue: true,
            title: text,
            body,
            textVariant: 'danger',
            progressVariant: 'danger',
        });
    }

    function validationError(text, body = null) {
        message({
            bodyClass: 'toast-body-error',
            modelValue: 20000,
            title: text,
            body,
            textVariant: 'danger',
            progressVariant: 'danger',
        });
    }

    return {
        message,
        info,
        error,
        validationError,
    };
})