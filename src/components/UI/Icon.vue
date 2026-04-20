<script setup lang="ts">

defineOptions({ name: 'SvgIcon', inheritAttrs: false });

const {
  name,
  color = null,
  size = '20px',
} = defineProps<{
  name: string,
  color?: string,
  size?: string,
}>();

</script>
<template>
  <template v-if="color">
    <svg aria-hidden="true" :width="size" :height="size" :fill="color">
      <use :href="`#icon-${name}`" />
    </svg>
  </template>
  <template v-else>
    <svg aria-hidden="true" :width="size" :height="size" class="app-svg-icon">
      <use :href="`#icon-${name}`" />
    </svg>
  </template>
</template>
