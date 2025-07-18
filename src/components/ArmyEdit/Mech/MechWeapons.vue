<script setup>
import {useMechStore} from '../../../store/mech-store.js';
import {computed} from 'vue';
import MechWeaponItem from './MechWeapons/MechWeaponItem.vue';
import draggable from 'vuedraggable';
import MechWeaponAdd from './MechWeapons/MechWeaponAdd.vue';
import {useValidationStore} from '../../../store/validation-store.js';
import IconValidationError from '../../UI/IconValidationError.vue';

const mechStore = useMechStore();
const validationStore = useValidationStore();

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});

const mech = computed(() => mechStore.getMech(mechId));

const validationMessages = computed(() => validationStore.mechAllWeaponMessages(mechId));
const valid = computed(() => !validationMessages.value.length);

function onSortableChange(event) {
  let moved = event.moved;
  if (!moved) {
    return;
  }

  mechStore.moveMechWeaponAttachment(mechId, moved.element, moved.newIndex);
}

const weapons = computed(() => mechStore.getMechAvailableWeaponsInfo(mechId));

</script>
<template>
  <thead :class="{
    'tbody-btn': true,
    'table-tinted': valid,
    'table-danger': !valid
  }">
  <tr>
    <th class="table-btn-cell">
      <IconValidationError
          size="sm"
          :message-array="validationMessages"
      />
    </th>
    <th>
      Weapons
    </th>
    <th class="text-end pe-1">
      Damage
    </th>
    <th class="text-end pe-1">
      Range
    </th>
    <th>
      Traits
    </th>
    <td class="table-btn-cell">
      <MechWeaponAdd
          :mech-id="mechId"
          text="Melee"
          :options="weapons.melee"
      />
    </td>
    <td class="table-btn-cell">
      <MechWeaponAdd
          :mech-id="mechId"
          text="Ranged"
          :options="weapons.ranged"
      />
    </td>
    <th class="fw-medium text-end">
      Slots
    </th>
    <th class="fw-medium text-end">
      Tons
    </th>
    <th></th>
  </tr>
  </thead>
  <draggable
      :list="mech.weapons"
      draggable=".list-item-sortable"
      tag="tbody"
      item-key="id"
      :group="'mech-' + mechId +'-weapons'"
      handle=".btn-grab-weapon"
      ghost-class="ghost"
      @change="onSortableChange"
      :animation="200"
      :preventOnFilter="false"
  >
    <template #item="{ element, index }">
      <MechWeaponItem
          :mech-id="mechId"
          :mech-weapon-attachment-id="element.id"
          :index="index"
      />
    </template>
  </draggable>
</template>
