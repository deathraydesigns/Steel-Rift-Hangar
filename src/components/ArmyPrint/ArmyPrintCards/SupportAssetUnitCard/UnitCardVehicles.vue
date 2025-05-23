<script setup>
import {useSupportAssetUnitsStore} from '../../../../store/support-asset-units-store.js';
import {computed} from 'vue';
import {TRAIT_GARRISON, unitTraitDisplayName} from '../../../../data/unit-traits.js';
import {getter} from '../../../../store/helpers/store-helpers.js';
import {chunk} from 'es-toolkit/compat';
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
const unit = computed(() => unitStore.getUnitAttachmentInfo(unitAttachmentId));

const hasJump = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.jump));
const hasArmor = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.armor));
const hasGarrison = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.garrison_units.length));
const hasTraits = computed(() => !!unit.value.vehicles.find((vehicle) => vehicle.traits.find(t => t.id !== TRAIT_GARRISON)));

const hasGarrisonWithRefIds = computed(() => {
  return unit.value.vehicles.find((vehicle) => vehicle.garrison_units.find(g => g.card_ref_id));
});

const statArray = getter((stat) => {
  return chunk(Array(stat).fill(0), 4);
});

function filterTraits(traits) {
  return traits.filter(t => t.id !== TRAIT_GARRISON);
}

</script>
<template>
  <template v-if="unit.vehicles.length">
    <UnitCardHalfHeader
        label="Unit Models"
        :size_id="unit.size_id"
    />

    <table class="table-stats">
      <thead>
      <tr>
        <th class="text-start text-nowrap">
          {{ unit.attached_element_label || 'Vehicle' }}
        </th>
        <th class="text-end">
          Mov
        </th>
        <th class="text-end" v-if="hasJump">
          Jmp
        </th>
        <th class="text-start" v-if="hasArmor">
          Arm
        </th>
        <th class="text-start">
          Str
        </th>
        <th class="text-start">
          Weapons
        </th>
        <th v-if="hasGarrison" class="text-start" :colspan="hasGarrisonWithRefIds ? 2: 1">
          Garrison
        </th>
        <th class="text-start" v-if="hasTraits">
          Traits
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in unit.vehicles" :key="item.id"
      >
        <td class="small text-start">
          {{ item.display_name }}
        </td>
        <td class="text-end">
          <format-inches :value="item.move"/>
        </td>
        <td class="text-end" v-if="hasJump">
          <format-inches :value="item.jump"/>
        </td>
        <td class="text-start" v-if="hasArmor">
          <div class="text-nowrap" v-for="chunk in statArray(item.armor)"><span class="use use-armor"
                                                                                v-for="i in chunk">&nbsp;</span>
          </div>
        </td>
        <td class="text-start">
          <div class="text-nowrap" v-for="chunk in statArray(item.structure)"><span class="use use-structure"
                                                                                    v-for="i in chunk">&nbsp;</span>
          </div>
        </td>
        <td class="text-start small">
          <div v-for="(weapon, index) in item.weapons">
            {{ weapon.display_name }}<span class="text-nowrap" v-if="weapon.max_uses">&nbsp;<span
              class="use use-weapon" v-for="i in Array(weapon.max_uses)">&nbsp;</span></span><span
              v-if="index !== item.weapons.length - 1">, </span>
          </div>
        </td>
        <td v-if="hasGarrisonWithRefIds" class="text-end small">
          <div
              v-for="squad in item.garrison_units"
              class="text-nowrap font-monospace"
          >
            {{ formatCardRef(squad.card_ref_id) }}
            <div v-if="!squad.card_ref_id">
              &nbsp;
            </div>
          </div>
        </td>
        <td v-if="hasGarrison" class="text-start small">
          <div
              v-for="squadDisplayName in item.garrison_units.map(i => i.display_name)"
              class="text-nowrap"
          >
            {{ squadDisplayName }}
          </div>
        </td>
        <td class="text-start small" v-if="filterTraits(item.traits).length">
          {{ filterTraits(item.traits).map(t => unitTraitDisplayName(t)).join(', ') }}
        </td>
      </tr>
      </tbody>
    </table>
  </template>
</template>