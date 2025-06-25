<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import {computed} from 'vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import {BButton} from 'bootstrap-vue-next';
import FormatNumber from '../../../functional/format-number.vue';
import DamageFormatter from '../../../UI/DamageFormatter.vue';
import RangeFormatter from '../../../UI/RangeFormatter.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';

const mechStore = useMechStore();

const {
  mechId,
  mechWeaponAttachmentId,
  index,
} = defineProps({
  mechId: Number,
  mechWeaponAttachmentId: Number,
  index: Number,
});

const weapon = computed(() => mechStore.getMechWeaponAttachmentInfo(mechId, mechWeaponAttachmentId));

function remove() {
  mechStore.removeMechWeaponAttachment(mechId, mechWeaponAttachmentId);
}
</script>
<template>
  <tr
      :class="{
        'list-item-sortable tr-btn': true,
        'table-danger-subtle': !weapon.valid
      }"
  >
    <td class="table-btn-cell">
      <span class="btn btn-sm btn-grab-weapon btn-transparent me-2">:::</span>
    </td>
    <td>
      {{ weapon.display_name }}
    </td>
    <td class="text-end">
      <DamageFormatter
          :damage="weapon.damage"
          :melee-base-damage="weapon.melee_base_damage"
          :melee-modifier-damage="weapon.melee_trait_damage"
          :melee-total-damage="weapon.melee_total_damage"
      />
    </td>
    <td class="text-end text-nowrap">
      <RangeFormatter
          :range="weapon.range"
          :modifier="weapon.range_modifier"
          :total="weapon.range_total"
      />
    </td>
    <td>
      <TraitList :traits="weapon.traits"/>
    </td>
    <td class="table-btn-cell" colspan="2">
      <BButton
          @click="remove()"
          variant="danger"
          size="sm"
          class="me-1"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
      <IconNotAvailable
          btn-class="me-1"
          :valid="weapon.valid"
          :validation-message="weapon.validation_message"
      />
      <IconRequiredByGroup
          btn-class="me-1"
          :required="weapon.required_by_group"
          :reason="weapon.required_by_group_reason"
      />
      <IconTeamGroupPerks
          :perks="weapon.team_perks"
          btn-class="me-1"
      />
      <IconFactionPerks
          :perks="weapon.faction_perks"
          btn-class="me-1"
      />
    </td>
    <td class=" text-end">
      <format-number :val="weapon.slots" :invert-color="true"/>
    </td>
    <td class=" text-end">
      <format-number :val="weapon.cost" :invert-color="true"/>
    </td>
    <td>
      <small v-if="weapon.duplicate_cost">
        +{{ weapon.duplicate_percent }}%
        ({{ weapon.base_cost }} + {{ weapon.duplicate_cost }})
      </small>
    </td>
  </tr>
</template>