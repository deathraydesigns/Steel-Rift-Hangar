<script setup>
import {useTemplateRef} from 'vue';
import {loadSaveFileData} from '../../store/helpers/store-save-load.js';
import {BButton} from 'bootstrap-vue-next';
import {toaster} from '../../toaster.js';

const fileUpload = useTemplateRef('file-upload');

function clickFile() {
  fileUpload.value.click();
}

function fileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {

        loadSaveFileData(JSON.parse(e.target.result));

      } catch (error) {
        toaster().error('Invalid Save File', error);
        console.error('Error parsing JSON:', error);
      }

      fileUpload.value.value = null;
    };
    reader.readAsText(file);
  }
}
</script>
<template>
  <input ref="file-upload" type="file" @change="fileChange" accept="application/json" hidden>
  <BButton @click="clickFile" size="sm" class="ms-1">Load</BButton>
</template>