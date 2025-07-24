<script setup lang="ts">
import UnitCardWeapons from "./UnitCardWeapons.vue";
import UnitCardVehicles from "./UnitCardVehicles.vue";
import UnitCardTraits from "./UnitCardTraits.vue";
import {useSupportAssetUnitsStore} from "../../../../store/support-asset-units-store"
import {computed} from "vue"

const unitStore = useSupportAssetUnitsStore()

const {unitAttachmentId} = defineProps({
  unitAttachmentId: {
    type: Number,
    required: true,
  },
  weapons: {
    type: Array,
    required: true,
  },
  traits: {
    type: Array,
    required: true,
  },
  orders: {
    type: Array,
    required: true,
  },
});

const damageSuffix = computed(() => {
  if(unitStore.isSquadron(unitAttachmentId)){
    return ` x (X)`
  }
})


</script>
<template>
  <UnitCardVehicles :unit-attachment-id="unitAttachmentId"/>
  <div class="row g-1">
    <div class="col-6 mt-0">
      <UnitCardWeapons :weapons="weapons" :damage-suffix="damageSuffix"/>
    </div>
    <div class="col-6 mt-0">
      <UnitCardTraits
          :traits="traits"
          :orders="orders"
      />
    </div>
  </div>
</template>