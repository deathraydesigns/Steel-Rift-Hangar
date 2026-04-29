<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { useMechStore } from '../../../store/mech-store';
import { useValidationStore } from '../../../store/validation-store';
import type { MechUpgradeAttachment } from '../../../types';
import IconValidationError from '../../UI/IconValidationError.vue';
import MechUpgradeAdd from './MechUpgrades/MechUpgradeAdd.vue';
import MechUpgradeItem from './MechUpgrades/MechUpgradeItem.vue';

const mechStore = useMechStore();
const validationStore = useValidationStore();

const { mechId } = defineProps<{
  mechId: number
}>();

const mech = computed(() => mechStore.getMech(mechId)!);

const validationMessages = computed(() => validationStore.mechAllUpgradesMessages(mechId));
const valid = computed(() => !validationMessages.value.length);

function onSortableChange(event: {
  moved?: {
    element: MechUpgradeAttachment,
    newIndex: number,
  }
}) {
  let moved = event.moved;
  if (!moved) {
    return;
  }

  mechStore.moveMechUpgradeAttachment(mechId, moved.element, moved.newIndex);
}

const hasDroneUpgrade = computed(() => mechStore.getMechUpgradesAttachmentInfo(mechId).some(v => !!v.drone_attach_type));
const upgradeOptions = computed(() => mechStore.getMechAvailableUpgradesInfo(mechId).filter(v => !v.drone_attach_type));
const droneUpgradeOptions = computed(() => mechStore.getMechAvailableUpgradesInfo(mechId).filter(v => !!v.drone_attach_type));
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
    <template v-if="hasDroneUpgrade">
      <th colspan="2">
        Traits
      </th>
      <th>
        Drone Targets
      </th>
    </template>
    <template v-else>
      <th colspan="3">
        Traits
      </th>
    </template>
    <th class="table-btn-cell">
      <MechUpgradeAdd text="Add" type="Upgrades" :mech-id="mechId" :options="upgradeOptions" />
    </th>
    <th class="table-btn-cell">
      <MechUpgradeAdd text="Drones" type="Drones" :mech-id="mechId" :options="droneUpgradeOptions" />
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