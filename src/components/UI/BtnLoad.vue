<script setup>
import {ref, useTemplateRef} from 'vue';
import {BDropdown, BDropdownItem} from 'bootstrap-vue-next';
import ModalImportMechs from './Modal/ModalImportMechs.vue';
import {loadSaveFileData} from '../../store/helpers/store-save-load.js';
import {jsonFileParser} from '../../composables/file-upload.js';
import ModalDataUrlImport from './Modal/ModalDataUrlImport.vue';

const fileUpload = useTemplateRef('file-upload');
const fileImport = useTemplateRef('file-import');
const modalImportMechs = useTemplateRef('modal-import-mechs');

const importModalVisible = ref(false);
const dataUrlModalVisible = ref(false);

const fileUploadChange = jsonFileParser((jsonData) => {
  loadSaveFileData(jsonData);
  fileUpload.value.value = null;
});

const fileImportChange = jsonFileParser((jsonData) => {
  modalImportMechs.value.importJsonData(jsonData);
  fileImport.value.value = null;
});

const onImportFromUrlData = (jsonData) => {
  modalImportMechs.value.importJsonData(jsonData);
};
</script>
<template>
  <input ref="file-upload" type="file" @change="fileUploadChange" accept="application/json" hidden>
  <input ref="file-import" type="file" @change="fileImportChange" accept="application/json" hidden>

  <BDropdown
      variant="secondary"
      size="sm"
      class="d-inline-block ms-1"
  >
    <template #button-content>
      Load
    </template>
    <BDropdownItem @click="() => fileUpload.click()">
      <span class="material-symbols-outlined">file_open</span>
      Load File
    </BDropdownItem>
    <BDropdownItem @click="() => fileImport.click()">
      <span class="material-symbols-outlined">place_item</span>
      Import HE-Vs from File
    </BDropdownItem>
    <BDropdownItem @click="dataUrlModalVisible = true">
      <span class="material-symbols-outlined">place_item</span>
      Import HE-Vs from Data URL
    </BDropdownItem>
  </BDropdown>
  <ModalDataUrlImport
      v-model="dataUrlModalVisible"
      @data-url-success="onImportFromUrlData"
  />
  <ModalImportMechs
      ref="modal-import-mechs"
      v-model="importModalVisible"
  />
</template>