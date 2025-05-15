<script setup>
import {BToastOrchestrator, useToastController} from 'bootstrap-vue-next';
import {useToastStore} from '../../store/toast-store.js';

const {show} = useToastController();
const store = useToastStore();

store.$subscribe((mutation, state) => {
  const props = state.messages.pop();

  show({
    props,
  });
});
</script>
<template>
  <BToastOrchestrator/>
</template>
