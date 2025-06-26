<script setup>
import {computed} from 'vue';
import {BPopover} from 'bootstrap-vue-next';

const {
  required,
  reason,
  btnClass,
} = defineProps({
  required: {
    type: Boolean,
  },
  reason: {},
  btnClass: {
    type: String,
  },
});

const requiredReason = computed(() => {
  if (required && !reason) {
    return 'Required by Group';
  }
  return reason;
});
</script>
<template>
  <BPopover>
    <template #target>
      <button
          :class="`btn btn-sm btn-default btn-danger-light ${btnClass}`"
          v-show="required"
      >
        <span class="material-symbols-outlined">lock</span>
      </button>
    </template>

    {{ requiredReason }}
  </BPopover>
</template>