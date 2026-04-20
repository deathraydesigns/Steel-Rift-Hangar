<script setup lang="ts">
import { BPopover } from 'bootstrap-vue-next';

const { enabled = true } = defineProps<{
  enabled?: boolean,
}>();

</script>
<template>
  <BPopover
    lazy
    :manual="!enabled"
    teleport-to="body"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #target>
      <slot name="target" />
    </template>
    <template #default>
      <slot name="content"></slot>
    </template>
  </BPopover>
</template>
