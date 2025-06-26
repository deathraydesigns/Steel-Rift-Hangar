<script setup>
import {ref, toRaw, useTemplateRef} from 'vue';
import {BDropdown, BDropdownItem, BFormTextarea, BModal} from 'bootstrap-vue-next';
import ModalImportMechs from './ModalImportMechs.vue';
import {loadSaveFileData} from '../../store/helpers/store-save-load.js';
import {IMPORT_PREFIX, jsonFileParser} from '../../composables/file-upload.js';
import {useTeamStore} from '../../store/team-store.js';
import {useMechStore} from '../../store/mech-store.js';
import {decodeArmyListJsonFromUrl} from '../../composables/url-data-parser.js';

const teamStore = useTeamStore();
const mechStore = useMechStore(IMPORT_PREFIX);

const fileUpload = useTemplateRef('file-upload');
const fileImport = useTemplateRef('file-import');
const urlImportString = ref('');

const importModalVisible = ref(false);
const dataUrlModalVisible = ref(false);

const fileUploadChange = jsonFileParser((jsonData) => {
  loadSaveFileData(jsonData);
  fileUpload.value.value = null;
});

const fileImportChange = jsonFileParser((jsonData) => {
  loadSaveFileData(jsonData, IMPORT_PREFIX);
  importModalVisible.value = true;
  fileImport.value.value = null;
});

function importMechs(mechs) {
  toRaw(mechs).forEach(({mechId, teamId}) => {
    const mech = mechStore.getMech(mechId);
    teamStore.addMechToTeamFromLoadedFile(mech, teamId);
  });
}

function importFromUrl() {
  const jsonData = decodeArmyListJsonFromUrl(urlImportString.value);
  loadSaveFileData(jsonData, IMPORT_PREFIX);
  importModalVisible.value = true;
  urlImportString.value = '';
}
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
  <ModalImportMechs
      v-model="importModalVisible"
      @import-mechs="importMechs"
  />
  <BModal
      lazy
      v-model="dataUrlModalVisible"
      size="lg"
      ok-variant="secondary"
      @ok="importFromUrl"
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