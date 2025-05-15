<template>
  <span :class="attrClass">{{ contents }}</span>
</template>
<script>
export default {
  name: 'number',
  props: {
    val: Number,
    invert: Boolean,
    invertColor: Boolean,
    positiveSigned: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    value() {
      let val = this.val;
      if (this.invert) {
        val = val * -1;
      }
      return val;
    },
    attrClass() {
      let val = this.value;
      if (this.invertColor) {
        val = val * -1;
      }

      return numberType(val);
    },
    contents() {
      let val = this.value;
      if (this.positiveSigned) {
        val = displayNumber(val);
      }

      return val;

    },
  },
};

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
