<script setup>
import Toaster from './components/UI/Toaster.vue';
import {computed, onMounted, provide, ref, useTemplateRef, watch} from 'vue';
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

const modal = useTemplateRef('modal');
provide('modal_container', modal);

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
  <div id="app-modal-container" class="no-print" ref="modal" :data-bs-theme="mode"></div>

  <div class="no-print text-bg-dark py-4">
    <div class="container text-center">
      <div class="lead">
        Created by <a href="https://github.com/unstoppablecarl" class="link-primary">UnstoppableCarl</a>
      </div>
      <div>Steel Rift: Hangar <a href="https://github.com/deathraydesigns/Steel-Rift-Hangar" class="link-primary">GitHub Project</a></div>
    </div>
  </div>
</template>