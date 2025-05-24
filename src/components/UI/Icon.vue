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
    color: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return {symbolId};
  },
});
</script>
<template>
  <template v-if="color">
    <svg aria-hidden="true" width="20px" height="20px" :fill="color">
      <use :href="symbolId"/>
    </svg>
  </template>
  <template v-else>
    <svg aria-hidden="true" width="20px" height="20px" class="app-svg-icon">
      <use :href="symbolId"/>
    </svg>
  </template>
</template>
