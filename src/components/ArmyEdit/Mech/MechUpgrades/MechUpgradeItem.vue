<script setup lang="ts">
import { BButton, BDropdown, BDropdownItem } from 'bootstrap-vue-next';
import { computed } from 'vue';
import { MECH_UPGRADE, MECH_UPGRADES, MechDroneUpgradeAttachType } from '../../../../data/mech-upgrades';
import { useMechStore } from '../../../../store/mech-store';
import FormatNumber from '../../../functional/format-number.vue';
import BtnToolTip from '../../../UI/BtnToolTip.vue';
import IconFactionPerks from '../../../UI/IconFactionPerks.vue';
import IconNotAvailable from '../../../UI/IconNotAvailable.vue';
import IconRequiredByGroup from '../../../UI/IconRequiredByGroup.vue';
import IconTeamGroupPerks from '../../../UI/IconTeamGroupPerks.vue';
import TraitList from '../../../UI/TraitList.vue';

const mechStore = useMechStore();

const {
  mechId,
  mechUpgradeAttachmentId,
  index,
} = defineProps<{
  mechId: number,
  mechUpgradeAttachmentId: number,
  index: number,
}>();

const upgrade = computed(() => mechStore.getMechUpgradeAttachmentInfo(mechId, mechUpgradeAttachmentId));

function remove() {
  mechStore.removeMechUpgradeAttachment(mechId, mechUpgradeAttachmentId);
}

const droneAttachmentTarget = computed(() => {
  const type = upgrade.value?.drone_attach_type;
  if (!type) return;

  const id = upgrade.value.drone_attachment_target_id!;
  if (!id) return;

  if (type === MechDroneUpgradeAttachType.WEAPON) {
    return mechStore.getMechWeaponAttachmentInfo(mechId, id);
  } else if (type === MechDroneUpgradeAttachType.MINE_DRONE_CARRIER) {
    return mechStore.getMechUpgradeAttachmentInfo(mechId, id);
  }
});

const droneAttachmentTypeLabel = computed(() => {
  const type = upgrade.value?.drone_attach_type;
  if (!type) return;

  if (type === MechDroneUpgradeAttachType.WEAPON) {
    return 'Weapon';
  } else if (type === MechDroneUpgradeAttachType.MINE_DRONE_CARRIER) {
    return 'Upgrade: ' + MECH_UPGRADES[MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM].display_name;
  }
});

type Option = { id: number, display_name: string, selected: boolean };

const droneAttachmentOptions = computed((): Option[] => {
  const type = upgrade.value?.drone_attach_type;
  if (!type) return [];

  const id = upgrade.value.drone_attachment_target_id!;
  let items: Omit<Option, 'selected'>[] = [];
  if (type === MechDroneUpgradeAttachType.WEAPON) {
    const usedIds = mechStore.getMechDroneUpgradeWeaponAttachmentTargetIds(mechId);
    items = mechStore.getMechWeaponsAttachmentInfo(mechId).filter(v => {
      if (v.id === droneAttachmentTarget.value?.id) return true;

      return !usedIds.includes(v.id);
    });
  } else if (type === MechDroneUpgradeAttachType.MINE_DRONE_CARRIER) {
    items = mechStore.getMechUpgradesAttachmentInfo(mechId).filter(v => v.upgrade_id === MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM);
  } else {
    throw new Error(`invalid type: ${type}`);
  }

  return items.map(v => {
    return {
      ...v,
      selected: v.id === id,
    };
  });
});

const selectedDroneAttachmentLabel = computed(() => {
  if (droneAttachmentTarget.value?.display_name) return droneAttachmentTarget.value.display_name;
  return 'Select Target';
});

const selectedDroneAttachmentValid = computed(() => !!droneAttachmentTarget.value?.display_name);

function setTarget(targetId: number) {
  mechStore.setMechDroneUpgradeAttachmentTarget(mechId, mechUpgradeAttachmentId, targetId);
}
</script>
<template>
  <tr
    :class="{
        'list-item-sortable tr-btn': true,
        'table-danger-subtle': !upgrade.valid
      }"
    v-if="upgrade"
  >
    <td class="table-btn-cell">
      <span class="btn btn-sm btn-grab-upgrade btn-transparent me-2">:::</span>
    </td>
    <td>
      <BtnToolTip>
        <template #target>
          <span class="text-tooltip">
            {{ upgrade.display_name }}
          </span>
        </template>
        <template #content>
          {{ upgrade.description }}
        </template>
      </BtnToolTip>

    </td>
    <template v-if="upgrade.drone_attach_type">
      <td colspan="2">
        <TraitList :traits="upgrade.traits" />
      </td>
      <td class="table-btn-cell">
        <BDropdown
          :id="'drone-attachment-' + mechId"
          class="dropdown-form d-inline-block"
          :toggle-class="{'border-danger': !selectedDroneAttachmentValid}"
          variant="default"
          size="sm"
          :text="selectedDroneAttachmentLabel"
          lazy
        >
          <BDropdownItem v-for="item in droneAttachmentOptions" @click="setTarget(item.id)">
            {{ item.display_name }}
          </BDropdownItem>

          <BDropdownItem v-if="droneAttachmentOptions.length === 0" disabled>
            No Valid Targets: {{ droneAttachmentTypeLabel }}
          </BDropdownItem>

        </BDropdown>
      </td>
    </template>
    <template v-else>
      <td colspan="3">
        <TraitList :traits="upgrade.traits" />
      </td>
    </template>
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
        :valid="upgrade.valid"
        :validation-message="upgrade.validation_message ?? ''"
      />
      <IconRequiredByGroup
        :required="upgrade.required_by_group"
        btn-class="me-1"
      />
      <IconTeamGroupPerks
        :perks="upgrade.team_perks"
        btn-class="me-1"
      />
      <IconFactionPerks
        :perks="upgrade.faction_perks"
        btn-class="me-1"
      />
    </td>
    <td class="text-end">
      <format-number :val="upgrade.slots" :invert-color="true" />
    </td>
    <td class="text-end">
      <format-number :val="upgrade.cost!" :invert-color="true" />
    </td>
    <td>
    </td>
  </tr>
</template>