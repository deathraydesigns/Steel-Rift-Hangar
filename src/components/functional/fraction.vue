<script setup>
import {computed} from 'vue';

const {
  a,
  b,
  successClass,
} = defineProps({
  a: {
    required: true,
  },
  b: {
    required: true,
  },
  successClass: {
    default: null,
    type: String,
  },
});

const containerClass = computed(() => {

  let success = (a == b);
  let result = {
    'text-success-emphasis': success,
  };

  if (successClass) {
    result[successClass] = success;
  }
  return result;
});
</script>
<template>
  <span :class="containerClass">
    <span :class="{
            'text-danger': (a > b)
          }">
      {{ a }}
    </span>/{{ b }}
  </span>
</template>