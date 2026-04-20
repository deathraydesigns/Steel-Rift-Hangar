<script setup lang="ts">
import { BDropdown, BDropdownItem } from 'bootstrap-vue-next';
import fileSaver from 'file-saver';
import { storeToRefs } from 'pinia';
import { makeArmyListDataUrl } from '../../composables/url-data-parser';
import { useArmyListStore } from '../../store/army-list-store';
import { makeSaveFileData } from '../../store/helpers/store-save-load';
import { toaster } from '../../toaster.js';

function saveFile(fileName: string, data: any) {
  let payload = JSON.stringify(data);
  let blob = new Blob([payload], { type: 'text/plain;charset=utf-8' });
  fileSaver.saveAs(blob, `${fileName}.json`);
}

const { name } = storeToRefs(useArmyListStore());

function saveToFile() {
  saveFile(name.value || 'steel-rift-army-list', makeSaveFileData());
}

function saveToUrl() {
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      toaster().error('Failed to copy text', (err as any).message);
    }
  }

  const data = makeSaveFileData();
  const url = makeArmyListDataUrl(data);

  copyToClipboard(url);

  toaster().info('Data URL Copied to clipboard', 'This URL contains your Army List and can be shared.');
}
</script>
<template>
  <BDropdown
    variant="secondary"
    size="sm"
    class="d-inline-block"
  >
    <template #button-content>
      Save
    </template>
    <BDropdownItem @click="saveToFile">
      <span class="material-symbols-outlined">docs</span>
      To File
    </BDropdownItem>
    <BDropdownItem @click="saveToUrl">
      <span class="material-symbols-outlined">copy_all</span>
      To Data Url
    </BDropdownItem>
  </BDropdown>
</template>