<script setup>
import {ref, toRaw, useTemplateRef} from 'vue';
import {BDropdown, BDropdownItem} from 'bootstrap-vue-next';
import ModalLoadBench from './ModalLoadBench.vue';
import {loadSaveFileData} from '../../store/helpers/store-save-load.js';
import {IMPORT_PREFIX, jsonFileParser} from '../../composables/file-upload.js';
import {useTeamStore} from '../../store/team-store.js';
import {useMechStore} from '../../store/mech-store.js';

const teamStore = useTeamStore();
const mechStore = useMechStore(IMPORT_PREFIX);

const fileUpload = useTemplateRef('file-upload');
const fileImport = useTemplateRef('file-import');

const modalVisible = ref(false);

const fileUploadChange = jsonFileParser((jsonData) => {
  loadSaveFileData(jsonData);
  fileUpload.value.value = null;
});

const fileImportChange = jsonFileParser((jsonData) => {
  loadSaveFileData(jsonData, IMPORT_PREFIX);
  modalVisible.value = true;
  fileImport.value.value = null;
});

function importMechs(mechs) {
  toRaw(mechs).forEach(({mechId, teamId}) => {
    const mech = mechStore.getMech(mechId);
    teamStore.addMechToTeamFromLoadedFile(mech, teamId);
  });
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
  </BDropdown>
  <ModalLoadBench
      v-model="modalVisible"
      @import-mechs="importMechs"
  />
</template>