import {useToastController} from 'bootstrap-vue-next';

export function toaster() {

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
            pos: 'top-center',
            bodyClass: 'toast-body-error',
            modelValue: true,
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
    };
}