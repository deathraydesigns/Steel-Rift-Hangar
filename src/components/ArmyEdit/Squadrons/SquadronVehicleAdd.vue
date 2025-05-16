<script setup>

import VehicleWeaponToolTip from '../../UI/VehicleWeaponToolTip.vue';

const {disabled} = defineProps({
  disabled: {
    type: Boolean,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['selected']);

function select(id, valid) {
  if (!valid) {
    return;
  }
  emit('selected', id);
}

</script>
<template>
  <BDropdown
      class="dropdown-table d-inline-block"
      size="sm"
      variant="header-add"
      placement="bottom-end"
      :disabled="disabled"
  >
    <template #button-content>
      <slot></slot>
    </template>
    <div class="position-relative">
      <table class="table table-hover table-borderless table-striped">
        <thead class="sticky-top top-0 shadow">
        <tr>
          <td>
            Type
          </td>
          <td class="text-end">
            Move
          </td>
          <td class="text-end">
            Armor
          </td>
          <td class="text-end">
            Structure
          </td>
          <td>
            Weapons
          </td>
          <td>
            Traits
          </td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <tr
            :class="{
              'dropdown-row': true,
              'disabled': !item.valid
            }"
            v-for="item in options" :key="item.id"
            @click="select(item.id, item.valid)"
        >
          <td class="text-nowrap">
            {{ item.display_name }}
          </td>
          <td>
            {{ item.move }}"
          </td>
          <td>
            {{ item.armor }}
          </td>
          <td>
            {{ item.structure }}
          </td>
          <td>
            <template v-if="item.weapons">
              <span v-for="(weapon, index) in item.weapons">
                <VehicleWeaponToolTip :weapon="weapon"/>
                <template v-if="index !== item.weapons.length - 1">, </template>
              </span>
            </template>
            <template v-if="item.weapons && item.weapon_choices">, </template>
            <template v-if="item.weapon_choices">
              <span v-for="(choices, index1) in item.weapon_choices">
                <span v-for="(weapon, index2) in choices" class="text-nowrap"> <VehicleWeaponToolTip :weapon="weapon"/>
                  <template v-if="index2 !== choices.length - 1"> or </template>
                </span><span v-if="index1 !== item.weapon_choices.length - 1">, </span>
              </span>
            </template>
          </td>
          <td>
            <TraitList :traits="item.traits"/>
          </td>
          <td>
            <IconNotAvailable :valid="item.valid !== false" :validation_message="item.validation_message"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </BDropdown>
</template>