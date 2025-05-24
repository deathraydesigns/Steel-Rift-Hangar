<script>
import {computed, defineComponent} from 'vue';
import 'virtual:svg-icon';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icona',
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return {symbolId};
  },
});
</script>
<template>
  <svg aria-hidden="true" width="20px" height="20px" class="app-svg-icon">
    <use :href="symbolId"/>
  </svg>
</template>
