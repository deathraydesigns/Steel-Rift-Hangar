<script setup>
import {computed, ref} from 'vue';
import {BButton} from 'bootstrap-vue-next';
import {useSupportAssetUnitsStore} from '../../../store/support-asset-units-store.js';
import BtnToolTip from '../../UI/BtnToolTip.vue';
import SquadronWeapons from './SquadronWeapons.vue';

const {supportAssetAttachmentId} = defineProps({
  supportAssetAttachmentId: {
    type: Number,
    required: true,
  },
});

const unitStore = useSupportAssetUnitsStore();

const info = computed(() => unitStore.getUnitAttachmentInfo(supportAssetAttachmentId));
const options = computed(() => unitStore.getAvailableVehiclesInfo(supportAssetAttachmentId));
const used_vehicles = computed(() => unitStore.getUnitVehicleCount(supportAssetAttachmentId));
const max_vehicles = computed(() => info.value.max_vehicles);

const add_disabled = computed(() => used_vehicles.value >= max_vehicles.value);
const visible = ref(false);

const unit_count_valid = computed(() => used_vehicles.value === max_vehicles.value)
function addVehicle(id) {
  unitStore.addVehicle(supportAssetAttachmentId, id);
}
</script>
<template>
  <div class="card card-dark-border">
    <div class="card-header d-flex text-bg-primary">
      <div class="flex-grow-1">
        <span class="d-inline-block py-1 ps-2 pe-1 fw-bold">
          {{ info.display_name }}
        </span>
        <BtnToolTip>
          <template #target="{mouseover, mouseleave}">
            <span
                @mouseover="mouseover"
                @mouseleave="mouseleave"
                :class="{
                  'btn btn-sm mx-1': true,
                  'btn-light': unit_count_valid,
                  'btn-danger': !unit_count_valid
                }"
            >
              {{ used_vehicles }}/{{ max_vehicles }}
              <template v-if="unit_count_valid">
                <span class="material-symbols-outlined text-success-emphasis">check</span>
              </template>
              <template v-else>
                <span class="material-symbols-outlined">warning</span>
              </template>
            </span>
          </template>
          <template #content>
            Group Size
          </template>
        </BtnToolTip>
      </div>
      <div class="text-end d-flex">
        <SquadronVehicleAdd :options="options" :disabled="add_disabled" @selected="addVehicle"/>
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
        <div class="ms-2">

          <span class="fw-bold">Unit Size:</span> {{ info.size.display_name }}
        </div>
        <SquadronVehicles :support-asset-attachment-id="supportAssetAttachmentId"/>
        <SquadronWeapons :support-asset-attachment-id="supportAssetAttachmentId"/>
      </div>
    </BCollapse>
  </div>
</template>
