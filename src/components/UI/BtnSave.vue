<script setup>
import fileSaver from 'file-saver';
import {makeSaveFileData} from '../../store/helpers/store-save-load.js';
import {useArmyListStore} from '../../store/army-list-store.js';
import {storeToRefs} from 'pinia';

function saveFile(fileName, data) {
  let payload = JSON.stringify(data);
  let blob = new Blob([payload], {type: 'text/plain;charset=utf-8'});
  fileSaver.saveAs(blob, `${fileName}.json`);
}

const {name} = storeToRefs(useArmyListStore());

function save() {
  saveFile(name.value || 'steel-rift-army-list', makeSaveFileData());
}
</script>
<template>
  <BButton @click="save" size="sm">Save</BButton>
</template>