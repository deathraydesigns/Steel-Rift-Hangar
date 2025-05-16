<script setup>
import {computed, ref} from 'vue';
import {BButton, BCollapse, BFormFloatingLabel, BFormSelect} from 'bootstrap-vue-next';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import UnitWeapons from './UnitWeapons.vue';
import UnitVehicles from './UnitVehicles.vue';
import UnitVehicleAdd from './UnitVehicleAdd.vue';
import {ULTRA_LIGHT_HEV_SQUADRON} from '../../../data/support-assets/ultra-light-hev-squadron.js';
import UnitGarrisonUnits from './UnitGarrisonUnits.vue';

const {supportAssetAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();

const visible = ref(false);
const info = computed(() => unitStore.getUnitAttachmentInfo(supportAssetAttachmentId));
const options = computed(() => unitStore.getAvailableVehiclesInfo(supportAssetAttachmentId));
const upgrade_pod_choices = computed(() => unitStore.getUnitUpgradePodChoicesInfo(supportAssetAttachmentId));

const add_disabled = computed(() => used_points.value >= max_points.value);
const unit_points_valid = computed(() => unitStore.getUnitAttachmentPointsValid(supportAssetAttachmentId));

const used_points = computed(() => unitStore.getUnitAttachmentUsedPoints(supportAssetAttachmentId));
const max_points = computed(() => unitStore.getUnitAttachmentMaxPoints(supportAssetAttachmentId));
const garrisonUnitChoices = computed(() => unitStore.getUnitAttachmentAllGarrisonChoicesInfo(supportAssetAttachmentId));

function addVehicle(id) {
  if (!visible.value) {
    visible.value = true;
  }
  unitStore.addVehicle(supportAssetAttachmentId, id);
}

function setUpgradePodChoice(upgradePodId) {
  unitStore.setUnitUpgradePod(supportAssetAttachmentId, upgradePodId);
}
</script>
<template>
  <div class="card card-dark-border">
    <div class="card-header d-flex text-bg-primary">
      <div class="flex-grow-1">
        <span class="d-inline-block py-1 ps-3 pe-1 fw-bold">
          {{ info.display_name }}
        </span>
        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                :class="{
                  'btn btn-sm mx-1': true,
                  'btn-light': unit_points_valid,
                  'btn-danger': !unit_points_valid
                }"
            >
              {{ used_points }}/{{ max_points }}
              <template v-if="unit_points_valid">
                <span class="material-symbols-outlined text-success-emphasis">check</span>
              </template>
              <template v-else>
                <span class="material-symbols-outlined">warning</span>
              </template>
            </span>
          </template>
          <template #content>
            {{ info.unit_points_description || `This unit can have a total of ${max_points} models` }}
          </template>
        </BtnToolTip>
      </div>
      <div class="text-end d-flex">
        <UnitVehicleAdd
            :options="options"
            :disabled="add_disabled"
            @selected="addVehicle"
        >
          <template v-if="info.support_asset_unit_id === ULTRA_LIGHT_HEV_SQUADRON">
            Add
            <Icon name="hev" color="#fff"/>
          </template>
          <template v-else>
            Add {{info.attached_element_label}}
          </template>
        </UnitVehicleAdd>
        <BButton
            size="sm"
            class="ms-1"
            variant="danger"
            @click="unitStore.removeSupportAssetId(supportAssetAttachmentId)"
        >
          <span class="material-symbols-outlined">delete</span>
        </BButton>
        <BButton
            :class="{
              'btn-sm btn-collapse ms-1': true,
              'collapsed': !visible
            }"
            variant="tertiary"
            :aria-expanded="visible ? 'true' : 'false'"
            :aria-controls="'collapse-support-asset-unit-' + supportAssetAttachmentId"
            @click="visible = !visible"
        />
      </div>
    </div>
    <BCollapse
        :id="'collapse-support-asset-unit-' + supportAssetAttachmentId"
        v-model="visible"
        lazy
    >
      <div class="card-body">
        <div class="d-flex">
          <div class="ms-2 flex-grow-1">
            <span class="fw-bold">Unit Size:</span> {{ info.size.display_name }}
          </div>

          <template v-if="upgrade_pod_choices.length">
            <div class="text-end flex-shrink-1">
              <BFormFloatingLabel
                  label="Upgrade Pod"
                  label-for="ul-hev-upgrade-pod"
                  class="mb-1"
              >
                <BFormSelect
                    :options="upgrade_pod_choices"
                    value-field="id"
                    text-field="description"
                    :model-value="info.upgrade_pod_id"
                    @update:model-value="setUpgradePodChoice"
                    size="sm"
                    variant="primary"
                    class="d-inline-block w-auto"
                    id="ul-hev-upgrade-pod"
                />
              </BFormFloatingLabel>
            </div>
          </template>
        </div>
        <UnitVehicles :support-asset-attachment-id="supportAssetAttachmentId" v-if="info.vehicles.length"/>
        <UnitWeapons :support-asset-attachment-id="supportAssetAttachmentId"/>
        <UnitGarrisonUnits :support-asset-attachment-id="supportAssetAttachmentId" v-if="garrisonUnitChoices.length"/>
      </div>
    </BCollapse>
  </div>
</template>
