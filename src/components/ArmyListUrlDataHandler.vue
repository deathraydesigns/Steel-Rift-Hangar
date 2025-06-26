<script setup>
import {h, onMounted} from 'vue';
import {decodeBase64, extractArmyListBase64FromUrl} from '../composables/url-data-parser.js';
import {useModalController} from 'bootstrap-vue-next';
import {loadSaveFileData} from '../store/helpers/store-save-load.js';

onMounted(() => {
  const dataString = extractArmyListBase64FromUrl(window.location.toString());
  if (!dataString) {
    return;
  }

  try {
    const jsonString = decodeBase64(dataString);
    const json = JSON.parse(jsonString);
    loadSaveFileData(json);
  } catch (error) {
    errorModal(error);
  }
});

function errorModal(error) {
  const {create} = useModalController();

  create({
    title: 'Invalid Army List Data Url',
    body: error.stack,
    titleClass: 'text-danger',
    contentClass: 'border-danger',
    slots: {
      cancel: () => false,
      default: (scope) => h('div', {class: 'ws-pre-wrap'}, {default: () => error.stack}),
    },
  });
}
</script>
<template>
  <div></div>
</template>