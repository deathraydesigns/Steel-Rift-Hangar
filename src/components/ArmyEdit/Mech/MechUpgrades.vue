<script setup>
import {useMechStore} from '../../../store/mech-store.js';
import MechUpgradeItem from './MechUpgrades/MechUpgradeItem.vue';
import MechUpgradeAdd from './MechUpgrades/MechUpgradeAdd.vue';
import {computed} from 'vue';
import draggable from 'vuedraggable';
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

const validationMessages = computed(() => validationStore.mechAllUpgradesMessages(mechId));
const valid = computed(() => !validationMessages.value.length);

function onSortableChange(event) {
  let moved = event.moved;
  if (!moved) {
    return;
  }

  mechStore.moveMechUpgradeAttachment(mechId, moved.element, moved.newIndex);
}

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
      Upgrades
    </th>
    <th colspan="3">
      Traits
    </th>
    <td class="table-btn-cell">
      <MechUpgradeAdd :mech-id="mechId"/>
    </td>
    <th>
    </th>
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
      :list="mech.upgrades"
      draggable=".list-item-sortable"
      tag="tbody"
      item-key="id"
      :group="'mech-' + mechId +'-upgrades'"
      handle=".btn-grab-upgrade"
      ghost-class="ghost"
      @change="onSortableChange"
      :animation="200"
      :preventOnFilter="false"
  >
    <template #item="{ element, index }">
      <MechUpgradeItem
          :mech-id="mechId"
          :mech-upgrade-attachment-id="element.id"
          :index="index"
      />
    </template>
  </draggable>
</template>