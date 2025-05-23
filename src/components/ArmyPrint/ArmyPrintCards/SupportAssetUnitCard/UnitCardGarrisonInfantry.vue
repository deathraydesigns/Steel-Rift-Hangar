<script setup>
import {useSupportAssetUnitsStore} from '../../../../store/support-asset-units-store.js';
import {computed} from 'vue';
import {unitTraitDisplayName} from '../../../../data/unit-traits.js';
import {formatCardRef} from '../../../functional/formatters.js';
import UnitCardHalfHeader from './UnitCardHalfHeader.vue';
import FormatInches from '../../../functional/format-inches.vue';

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();
const units = computed(() => unitStore.getUnitAttachmentGarrisonUnitCardInfo(unitAttachmentId));

const hasCardRefIds = computed(() => !!units.value.find((unit) => unit.card_ref_id));
const hasArmor = computed(() => !!units.value.find((unit) => unit.armor));

</script>
<template>
  <template v-if="units.length">
    <UnitCardHalfHeader
        label="Garrisoned Units"
        :size-display-name="units[0].size.display_name"
        :type-display-name="units[0].unit_type.display_name"
    />
    <table class="table-stats">
      <thead>
      <tr>
        <th class="text-start text-nowrap" :colspan="hasCardRefIds ? 2 : 1">
          Inf. Squad
        </th>
        <th class="text-end">
          Mov
        </th>
        <th
            v-if="hasArmor"
            class="text-start"
        >
          Arm
        </th>
        <th class="text-start">
          Str
        </th>
        <th class="text-start">
          Weapons
        </th>
        <th class="text-start">
          Traits
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in units" :key="item.id"
      >
        <td v-if="hasCardRefIds" class="text-end font-monospace small">
          {{ formatCardRef(item.card_ref_id) }}
        </td>
        <td class="text-start small">
          {{ item.display_name }}
        </td>
        <td class="text-end">
          <format-inches :value="item.move"/>
        </td>
        <td
            v-if="hasArmor"
            class="text-start"
        >
          <div class="text-nowrap" v-if="item.armor"><span class="use use-armor"
                                                           v-for="i in Array(item.armor)">&nbsp;</span>
          </div>
        </td>
        <td class="text-start">
          <div class="text-nowrap" v-if="item.structure"><span class="use use-structure"
                                                               v-for="i in Array(item.structure)">&nbsp;</span>
          </div>
        </td>
        <td class="text-start small">
          <span
              class=" text-nowrap"
              v-for="(weapon, index) in item.weapons"
          >
            {{ weapon.display_name }}<span class="text-nowrap" v-if="weapon.max_uses">&nbsp;<span
              class="use use-weapon" v-for="i in Array(weapon.max_uses)">&nbsp;</span></span><span
              v-if="index !== item.weapons.length - 1">, </span>
          </span>
        </td>
        <td class="text-start small">
          {{ item.traits.map(t => unitTraitDisplayName(t)).join(', ') }}
        </td>
      </tr>
      </tbody>
    </table>
  </template>
</template>