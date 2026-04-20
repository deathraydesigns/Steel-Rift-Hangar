<script setup lang="ts">
import { computed } from 'vue';

const {
  val,
  invert,
  invertColor,
  positiveSigned,
} = defineProps<{
  val: number | null,
  invert?: boolean,
  invertColor?: boolean,
  positiveSigned?: boolean,
}>();

function getValue() {
  let result = val;
  if (invert) {
    result = (val ?? 0) * -1;
  }
  return result ?? 0;
}

const attrClass = computed(() => {
  let val = getValue();
  if (invertColor) {
    val = val * -1;
  }

  return numberType(val);
});

const contents = computed(() => {
  const val = getValue();
  if (positiveSigned) {
    return displayNumber(val);
  }
  return val + '';
});

function displayNumber(val: number): string {
  let r = '';
  if (val > 0) {
    r = '+' + val;
  }
  return r;
}

function numberType(val: number) {
  let type;
  if (val === 0) {
    type = 'zero';
  } else if (val > 0) {
    type = 'positive';
  } else {
    type = 'negative';
  }
  return 'number-' + type;
}
</script>
<template>
  <span :class="attrClass">{{ contents }}</span>
</template>
