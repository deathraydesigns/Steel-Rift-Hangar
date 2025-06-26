<script setup>
import {h, onErrorCaptured, onMounted, provide} from 'vue';
import AppHeader from './components/AppHeader.vue';
import {BModalOrchestrator, BToastOrchestrator, useColorMode, useModalController} from 'bootstrap-vue-next';

const {create} = useModalController();
onErrorCaptured((error) => {
  create({
    title: 'Error',
    body: error.stack,
    titleClass: 'text-danger',
    contentClass: 'border-danger',
    slots: {
      cancel: () => false,
      default: (scope) => h('div', {class: 'ws-pre-wrap'}, {default: () => error.stack}),
    },
  });
});

onMounted(() => {
  document.getElementById('failsafe-container')?.remove();
});

const mode = useColorMode({
  emitAuto: true,
  persist: true,
});
provide('color_mode', mode);

</script>
<template>
  <div class="d-flex flex-column vh-100">

    <BToastOrchestrator/>
    <BModalOrchestrator/>

    <AppHeader/>
    <RouterView/>

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