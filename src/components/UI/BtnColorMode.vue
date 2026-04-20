<script setup lang="ts">
import { BDropdown, BDropdownItem } from 'bootstrap-vue-next';
import { computed, inject, type Ref } from 'vue';

const mode = inject<Ref<keyof typeof modes>>('color_mode')!;

const modes = {
  auto: {
    display_name: 'Auto',
    icon: 'contrast',
  },
  light: {
    display_name: 'Light',
    icon: 'light_mode',
  },
  dark: {
    display_name: 'Dark',
    icon: 'dark_mode',
  },
};

const modeIcon = computed(() => modes[mode.value].icon);

function setMode(value: keyof typeof modes) {
  mode.value = value;
}
</script>
<template>
  <BDropdown
    size="sm"
    class="d-inline-block ms-1"
  >
    <template #button-content>
      <span class="material-symbols-outlined">{{ modeIcon }}</span>
    </template>
    <BDropdownItem
      v-for="(name, key) in modes"
      @click="setMode(key)"
    >
      <span class="material-symbols-outlined">{{ modes[key].icon }}</span> {{ name.display_name }}
    </BDropdownItem>
  </BDropdown>
</template>
