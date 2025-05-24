<script setup>
import Toaster from './components/UI/Toaster.vue';
import {computed, onMounted, provide, ref, watch} from 'vue';
import AppHeader from './components/AppHeader.vue';
import {ROUTE_PRINT} from './routes.js';
import ArmyPrint from './components/ArmyPrint.vue';
import ArmyEdit from './components/ArmyEdit.vue';

import {useColorMode} from 'bootstrap-vue-next';

onMounted(() => {
  document.getElementById('failsafe-container')?.remove();
});

const currentPath = ref(window.location.hash);

provide('currentPath', currentPath);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const showPrint = computed(() => {
  return currentPath.value.slice(1) === ROUTE_PRINT;
});

const mode = useColorMode({
  emitAuto: true,
  persist: true,
  selector: false,
});

provide('color_mode', mode);

function updateBodyColorMode() {
  const bodyEl = document.body;
  if (mode.value === 'dark') {
    bodyEl.classList.add('body-dark');
    bodyEl.classList.remove('body-light');
  } else {
    bodyEl.classList.remove('body-dark');
    bodyEl.classList.add('body-light');
  }
}

onMounted(() => {
  updateBodyColorMode();
});

watch(mode, () => {
  updateBodyColorMode();
});

</script>
<template>
  <Toaster/>
  <AppHeader/>
  <ArmyPrint v-show="showPrint"/>
  <ArmyEdit v-show="!showPrint"/>
</template>