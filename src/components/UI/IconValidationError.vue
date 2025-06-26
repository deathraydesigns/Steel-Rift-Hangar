<script setup>

import {computed} from 'vue';
import {BPopover} from 'bootstrap-vue-next';
import SvgIcon from './Icon.vue';

const {
  title,
  messageArray,
  message,
  size,
  icon,
  btnClass,
  visible,
} = defineProps({
  title: {
    type: String,
  },
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
  btnClass: {},
  icon: {
    type: String,
  },
  visible: {
    default: null,
  },
});

const isVisible = computed(() => {
  if (visible === true || visible === false) {
    return visible;
  }

  return message || messageArray?.length;
});
</script>
<template>
  <BPopover>
    <template #target>
      <button
          v-show="isVisible"
          :class="`btn btn-${size} btn-danger ${btnClass}`">
        <SvgIcon :name="icon" v-if="icon"/>
        <span class="material-symbols-outlined">
          warning
        </span>
      </button>
    </template>

    <template #title>
      {{ title || 'Validation Error' }}
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
    <slot name="default"></slot>
  </BPopover>
</template>