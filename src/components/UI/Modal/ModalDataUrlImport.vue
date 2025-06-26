<script setup>
import {BFormTextarea, BModal} from 'bootstrap-vue-next';
import {ref} from 'vue';
import {ROUTE_ARMY_LIST_DATA} from '../../../router.js';
import {useRouter} from 'vue-router';
import {urlDataStringToJson} from '../../../composables/url-data-parser.js';
import {toaster} from '../../../toaster.js';

const router = useRouter();
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

    let path = tryOrInvalid(
        () => {
          let path = url.pathname;
          if (path.startsWith(baseUrl)) {
            return path.slice(baseUrl.length);
          }
        },
        'Invalid URL Path',
    );

    let dataString = tryOrInvalid(
        () => new URLSearchParams(url.search).get('payload'),
        'Invalid URL Query Parameter',
    );

    const resolvedRoute = router.resolve(path);
    if (resolvedRoute.name !== ROUTE_ARMY_LIST_DATA) {
      throw makeInvalidError('Incorrect Path');
    }

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