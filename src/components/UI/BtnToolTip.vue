<script setup>
import {BPopover} from 'bootstrap-vue-next';

const {enabled} = defineProps({
  enabled: {
    type: Boolean,
    default: true,
  },
});

</script>
<template>
  <BPopover
      lazy
      :manual="!enabled"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #target>
      <slot name="target"/>
    </template>
    <template #default>
      <slot name="content"></slot>
    </template>
  </BPopover>
</template>
