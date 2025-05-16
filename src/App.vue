<script setup>
import Toaster from './components/UI/Toaster.vue';
import {computed, onMounted, provide, ref} from 'vue';
import AppHeader from './components/AppHeader.vue';
import {ROUTE_PRINT} from './routes.js';
import ArmyPrint from './components/ArmyPrint.vue';
import ArmyEdit from './components/ArmyEdit.vue';

onMounted(() => {
  document.getElementById('failsafe-container')?.remove();
});

const currentPath = ref(window.location.hash);

provide('currentPath', currentPath);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const showPrint = computed(() => {
  return currentPath.value.slice(1) === ROUTE_PRINT
})
</script>
<template>
  <Toaster/>
  <AppHeader/>
  <ArmyPrint v-show="showPrint"/>
  <ArmyEdit v-show="!showPrint"/>
</template>