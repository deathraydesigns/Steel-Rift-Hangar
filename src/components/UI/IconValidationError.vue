<script setup>

import {computed} from 'vue';

const {messageArray, message, size} = defineProps({
  message: {
    default: '',
  },
  messageArray: {
    type: Array,
  },
  size: {
    type: String,
    default: 'md',
  },
});

const hasMessage = computed(() => {
  return message || messageArray?.length;
});
</script>
<template>
  <BPopover
      :close-on-hide="true"
  >
    <template #target>
      <button
          v-show="!!hasMessage"
          :class="`btn btn-${size} btn-danger`">
        <span class="material-symbols-outlined">
          warning
        </span>
      </button>
    </template>

    <template #title>
      Validation error
      <span class="material-symbols-outlined">
        warning
      </span>
    </template>

    <template v-if="messageArray">
      <template v-for="message in messageArray">
        {{ message }}<br>
      </template>

    </template>
    {{ message }}
  </BPopover>
</template>