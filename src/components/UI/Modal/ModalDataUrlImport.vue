<script setup>
import {BFormTextarea, BModal} from 'bootstrap-vue-next';
import {ref} from 'vue';
import {urlDataStringToJson} from '../../../composables/url-data-parser.js';
import {toaster} from '../../../toaster.js';

const visible = defineModel();
const urlImportString = ref('');

const emit = defineEmits(['data-url-success']);

function makeInvalidError(message, error = null) {
  return {
    INVALID: true,
    message: 'Invalid Data Url: ' + message,
    error,
  };
}

function tryOrInvalid(cb, errorMessage) {
  let result;
  let error;
  try {
    result = cb();
  } catch (e) {
    error = e;
  }
  if (!result) {
    throw makeInvalidError(errorMessage, error);
  }

  return result;
};

function submit() {
  const baseUrl = import.meta.env.BASE_URL;

  try {
    let url = tryOrInvalid(() => new URL(urlImportString.value), 'Not a URL');

    tryOrInvalid(
        () => baseUrl === url.pathname,
        'Invalid URL Path',
    );

    let dataString = tryOrInvalid(
        () => new URLSearchParams(url.search).get('payload'),
        'Invalid URL Query Parameter',
    );

    const json = tryOrInvalid(
        () => urlDataStringToJson(dataString),
        'Invalid JSON',
    );

    emit('data-url-success', json);
  } catch (e) {
    if (e.INVALID) {
      toaster().validationError(e.message, e?.error);
    } else {
      throw e;
    }
  }
}
</script>
<template>
  <BModal
      lazy
      v-model="visible"
      size="lg"
      ok-variant="secondary"
      @ok="submit"
  >
    <template #title>
      <strong>
        Importing HE-Vs
      </strong>
    </template>

    <template #default>
      <div class="fw-bold">Pase Data Url here</div>
      <BFormTextarea v-model="urlImportString"/>
    </template>

  </BModal>
</template>