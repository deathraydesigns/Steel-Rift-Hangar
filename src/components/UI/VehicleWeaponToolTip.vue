<script setup>

import BtnToolTip from './BtnToolTip.vue';

const {weapon} = defineProps({
  weapon: {
    type: Object,
  },
});
</script>
<template>
  <BtnToolTip>
    <template #target="{mouseover, mouseleave}">
      <span
          @mouseover="mouseover"
          @mouseleave="mouseleave"
          class="text-tooltip"
      >
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
          <td class="text-center">{{weapon.damage}}</td>
          <td class="text-center">
            <template v-if="weapon.range">
            {{weapon.range}}"
            </template>
            <template v-else>
              -
            </template>
          </td>
          <td>{{weapon.traits.map(t => t.display_name).join(', ')}}</td>
        </tr>
        </tbody>
      </table>
    </template>
  </BtnToolTip>
</template>