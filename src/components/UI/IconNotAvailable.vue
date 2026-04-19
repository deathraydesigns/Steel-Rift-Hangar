<script setup lang="ts">

import {BPopover} from 'bootstrap-vue-next';

const {
  valid,
  validationMessage,
  size  = 'sm',
  btnClass = '',
} = defineProps<{
  valid: boolean,
  validationMessage: string,
  size?: 'sm' | 'md' | 'lg',
  btnClass?: string,
}>();
</script>
<template>
  <BPopover>
    <template #target>
      <button
          :class="`btn btn-${size} btn-danger btn-danger-light ${btnClass}`"
          v-show="!valid"
      >
        <span class="material-symbols-outlined">block</span>
      </button>
    </template>

    {{ validationMessage }}
  </BPopover>
</template>
