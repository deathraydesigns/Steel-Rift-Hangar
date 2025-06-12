<script setup>
import {computed} from 'vue';

const {
  val,
  invert,
  invertColor,
  positiveSigned,
} = defineProps({
  val: Number,
  invert: Boolean,
  invertColor: Boolean,
  positiveSigned: {
    type: Boolean,
    default: false,
  },
});

function getValue(){
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
  let val = getValue();
  if (positiveSigned) {
    val = displayNumber(val);
  }

  return val;
});

function displayNumber(val) {
  if (val > 0) {
    val = '+' + val;
  }
  return val;
}

function numberType(val) {
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
