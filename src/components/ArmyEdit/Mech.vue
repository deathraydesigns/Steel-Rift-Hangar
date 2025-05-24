<script setup>
import {useMechStore} from '../../store/mech-store.js';
import Fraction from '../functional/fraction.vue';
import {computed, ref, watch} from 'vue';
import {BButton, BCollapse} from 'bootstrap-vue-next';
import {useExpandCollapseAll} from '../functional/expand-collapse.js';
import {useValidationStore} from '../../store/validation-store.js';
import IconValidationError from '../UI/IconValidationError.vue';
import MechStats from './Mech/MechStats.vue';

const mechStore = useMechStore();
const validationStore = useValidationStore();

const {
  mechId,
} = defineProps({
  mechId: {
    type: Number,
    required: true,
  },
});

const visible = ref(false);
const info = computed(() => mechStore.getMechInfo(mechId));

const invalid_mech_messages = computed(() => validationStore.getInvalidMechMessages(mechId));

const {
  collapseSignal,
  expandSignal,
} = useExpandCollapseAll();

watch(collapseSignal, () => visible.value = false);
watch(expandSignal, () => visible.value = true);

</script>
<template>
  <div
      :class="{
        'card card-mech': true,
        'border-danger': invalid_mech_messages?.length
      }"
  >
    <div class="card-body">
      <div class="row">
        <div class="col-auto col-md-auto col-lg-2 ">
          <span class="btn btn-sm btn-grab">:::</span>
          <div class="d-inline-block py-1 ps-3">
            HE-V {{ info.size.display_name }}
          </div>
        </div>
        <div class="col-auto col-md-auto col-lg-4">
          <div class="d-inline-block py-1">
            <strong class="pe-1">{{ info.display_name }}</strong>
          </div>
          <IconValidationError size="sm" :message-array="invalid_mech_messages"/>
        </div>
        <div class="col-sm-12 col-md-auto col-lg-6 d-flex">
          <div class="py-1 d-inline-block ms-auto">
            <span class="pe-2">
              <strong>Arm:</strong>
              {{ info.armor_stat }}
            </span>
            <span class="px-2">
              <strong>Str:</strong>
              {{ info.structure_stat }}
            </span>
            <span class="px-2">
              <strong>Slots: </strong>
              <fraction :a="info.used_slots" :b="info.max_slots"/>
            </span>
            <span class="px-2">
              <strong>Tons: </strong>
              <fraction :a="info.used_tons" :b="info.max_tons"/>
            </span>
          </div>

          <BButton
              size="sm"
              class="mx-1"
              variant="header-add"
              @click="mechStore.duplicateMech(mechId)"
          >
            <span class="material-symbols-outlined">content_copy</span>
          </BButton>

          <BButton
              size="sm"
              class="mx-1"
              variant="danger"
              @click="mechStore.removeMech(mechId)"
          >
            <span class="material-symbols-outlined">delete</span>
          </BButton>

          <BButton
              :class="'btn-collapse ' + (visible ? null : 'collapsed')"
              size="sm"
              variant="transparent"
              :aria-expanded="visible ? 'true' : 'false'"
              :aria-controls="'collapse-' + mechId"
              @click="visible = !visible"
          />
        </div>
      </div>
      <BCollapse
          :id="'collapse-' + mechId"
          v-model="visible"
          lazy
      >
        <hr class="mt-2">
        <div class="d-flex justify-content-md-center">
          <MechStats :mech-id="mechId"/>
        </div>
      </BCollapse>
    </div>
  </div>
</template>