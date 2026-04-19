import { type BaseColorVariant, type BaseTextColorVariant, useToastController } from 'bootstrap-vue-next';
import { defineStore } from 'pinia';

interface ToastOptions {
    title: string;
    body?: string | null;
    bodyClass?: string;
    pos?: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
    modelValue?: number | boolean;
    variant?: keyof BaseColorVariant | null | undefined;
    textVariant?: keyof BaseTextColorVariant | null | undefined;
    progressVariant?: keyof BaseColorVariant | null | undefined;
}

// needs to be defined as a pinia store to allow calling toasts from other stores not sure why
export const toaster = defineStore('toaster', () => {

    const { create } = useToastController();

    function message({
                         title,
                         body = null,
                         bodyClass,
                         pos = 'top-end',
                         modelValue = 10000,
                         variant = null,
                         textVariant = null,
                         progressVariant = 'info',
                     }: ToastOptions) {

        create({
            title,
            body: body ?? undefined,
            bodyClass,
            pos,
            modelValue,
            variant: variant ?? undefined,
            textVariant: textVariant ?? undefined,
            progressProps: {
                variant: progressVariant,
            },
        });
    }

    function info(title: string, body: string | null = null) {
        message({
            title,
            body,
        });
    }

    function error(text: string, body: string | null = null) {
        message({
            bodyClass: 'toast-body-error',
            modelValue: true,
            title: text,
            body,
            textVariant: 'danger',
            progressVariant: 'danger',
        });
    }

    function validationError(text: string, body: string | null = null) {
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
});
