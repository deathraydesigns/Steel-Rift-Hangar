<script setup>
import Toaster from './components/UI/Toaster.vue';
import {computed, onMounted, provide, ref} from 'vue';
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
});
provide('color_mode', mode);

</script>
<template>
  <div class="d-flex flex-column vh-100">

    <Toaster/>
    <AppHeader/>
    <ArmyPrint v-show="showPrint"/>
    <ArmyEdit v-show="!showPrint"/>

    <div class="no-print text-bg-dark py-4 mt-auto">
      <div class="container text-center">
        <div class="lead">
          Created by <a href="https://github.com/unstoppablecarl" class="link-primary">UnstoppableCarl</a>
        </div>
        <div>Steel Rift: Hangar <a href="https://github.com/deathraydesigns/Steel-Rift-Hangar" class="link-primary">GitHub
          Project</a></div>
      </div>
    </div>

  </div>
</template>