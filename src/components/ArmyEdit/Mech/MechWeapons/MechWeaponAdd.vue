<script setup>
import {useMechStore} from '../../../../store/mech-store.js';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import TraitList from '../../../UI/TraitList.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import {BDropdown} from 'bootstrap-vue-next';
import FormatInches from '../../../functional/format-inches.vue';

const {
  mechId,
  options,
  text,
} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const mechStore = useMechStore();

function addWeapon(upgradeId, valid) {
  if (!valid) {
    return;
  }
  mechStore.addMechWeaponAttachment(mechId, upgradeId);
}

</script>
<template>
  <BDropdown
      :id="'mech-input-weapons-add-' + mechId"
      class="dropdown-table"
      :text="text"
      size="sm"
      variant="secondary"
      lazy
  >
    <div class="position-relative">
      <table class="table table-hover table-borderless table-striped">
        <thead class="sticky-top top-0 shadow">
        <tr>
          <td>
            Weapon
          </td>
          <td class="text-end">
            Slots
          </td>
          <td class="text-end">
            Tons
          </td>
          <td class="text-end">
            Damage
          </td>
          <td class="text-end">
            Range
          </td>
          <td>
            Traits
          </td>
          <td colspan="3">
            Notes
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
            :class="{
              'dropdown-row': true,
              'disabled': !item.valid
            }"
            v-for="item in options" :key="item.weapon_id"
            @click="addWeapon(item.weapon_id, item.valid)"
        >
          <td>
            {{ item.display_name }}
          </td>
          <td class="text-end">
            <number :val="item.slots" :invert-color="true"/>
          </td>
          <td class="text-end">
            <number :val="item.cost" :invert-color="true"/>
          </td>
          <td class="text-end">
            {{ item.damage }}
          </td>
          <td class="text-end">
            <format-inches :value="item.range"/>
          </td>
          <td>
            <TraitList :traits="item.traits"/>
          </td>
          <td class="notes">
            <IconNotAvailable
                :valid="item.valid"
                :validation_message="item.validation_message"
            />
          </td>
          <td class="notes">
            <IconTeamGroupPerks
                class="ms-1"
                :perks="item.team_perks"
            />
          </td>
          <td class="notes">
            <IconFactionPerks
                class="ms-1"
                :perks="item.faction_perks"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>
</template>
