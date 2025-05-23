<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import {computed} from 'vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import {BButton} from 'bootstrap-vue-next';
import Number from '../../../functional/number.vue';
import FormatInches from '../../../functional/format-inches.vue';

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
  <tr class="list-item-sortable tr-btn">
    <td class="table-btn-cell">
      <span class="btn btn-sm btn-light btn-grab me-2">:::</span>
    </td>
    <td>
      {{ weapon.display_name }}
    </td>
    <td class="text-end">
      {{ weapon.damage }}
    </td>
    <td class="text-end">
      <format-inches :value="weapon.range"/>
    </td>
    <td>
      <TraitList :traits="weapon.traits"/>
    </td>
    <td class="table-btn-cell">
      <BButton
          v-if="!weapon.required_by_group"
          @click="remove()"
          variant="danger"
          size="sm"
      >
        <span class="material-symbols-outlined">delete</span>
      </BButton>
      <IconRequiredByGroup :required="weapon.required_by_group" :reason="weapon.required_by_group_reason"/>
      <IconTeamGroupPerks
          :perks="weapon.team_perks"
          class="ms-1"
      />
      <IconFactionPerks
          :perks="weapon.faction_perks"
          class="ms-1"
      />
    </td>
    <td>

    </td>
    <td class=" text-end">
      <number :val="weapon.slots" :invert-color="true"/>
    </td>
    <td class=" text-end">
      <number :val="weapon.cost" :invert-color="true"/>
    </td>
    <td>
      <small v-if="weapon.duplicate_cost">
        +{{ weapon.duplicate_percent }}%
        ({{ weapon.base_cost }} + {{ weapon.duplicate_cost }})
      </small>
    </td>
  </tr>
</template>