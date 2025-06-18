<script setup>

import {BPopover} from 'bootstrap-vue-next';

const {
  valid,
  validationMessage,
  size,
  btnClass,
} = defineProps({
  valid: {
    type: Boolean,
  },
  validationMessage: {
    type: String,
  },
  size: {
    type: String,
    default: 'sm',
  },
  btnClass:{
    type: String,
  }
});
</script>
<template>
  <BPopover
      :hover="true"
      :close-on-hide="true"
      :delay="{show: 100, hide: 0}"
  >
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
