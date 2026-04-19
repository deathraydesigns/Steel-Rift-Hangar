<script setup lang="ts">
import { computed } from 'vue';

const {
  val,
  invert = false,
  invertColor = false,
  positiveSigned = false,
} = defineProps<{
  val: number,
  invert?: boolean,
  invertColor?: boolean,
  positiveSigned?: boolean,
}>();

function getValue() {
  let result = val;
  if (invert) {
    result = val * -1;
  }
  return result;
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
  let r = '';
  if (positiveSigned) {
    r = displayNumber(val);
  }

  return r;
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
