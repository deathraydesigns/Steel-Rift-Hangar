<script setup>

import {BPopover} from 'bootstrap-vue-next';

const {valid, validation_message} = defineProps({
  valid: {
    type: Boolean,
  },
  validation_message: {
    type: String,
  },

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
          class="btn btn-sm btn-danger btn-danger-light"
          v-show="!valid"
      >
        <span class="material-symbols-outlined">block</span>
      </button>
    </template>

    {{ validation_message }}
  </BPopover>
</template>
