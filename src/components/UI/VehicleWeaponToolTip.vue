<script setup>

import BtnToolTip from './BtnToolTip.vue';
import FormatInches from '../functional/format-inches.vue';

const {weapon} = defineProps({
  weapon: {
    type: Object,
  },
});
</script>
<template>
  <BtnToolTip>
    <template #target>
      <span class="text-tooltip">
        <span class="text-nowrap">{{ weapon.display_name }}</span>
      </span>
    </template>
    <template #content>
      <table class="table table-sm m-0">
        <thead>
        <tr>
          <th class="text-center pt-0">Damage</th>
          <th class="text-center pt-0">Range</th>
          <th class=" pt-0">Traits</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">{{ weapon.damage }}</td>
          <td class="text-center">
            <format-inches :value="weapon.range"/>
          </td>
          <td>{{ weapon.traits.map(t => t.display_name).join(', ') }}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </BtnToolTip>
</template>