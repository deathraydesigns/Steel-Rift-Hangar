<script setup>

import {BButton, BModal} from 'bootstrap-vue-next';
import {useValidationStore} from '../../../store/validation-store.js';
import {storeToRefs} from 'pinia';
import {inject, ref} from 'vue';

const modal = ref(false);
const validationStore = useValidationStore();

const {list_is_valid, list_validation} = storeToRefs(validationStore);

const modalContainer = inject('modal_container');

function click() {
  if (!list_is_valid.value) {
    modal.value = !modal.value;
  }
}

</script>
<template>
  <BButton
      @click="click"
      size="sm"
      :variant="list_is_valid ? 'transparent' : 'danger'"
      :class="{
                  'btn ms-2 position-relative': true,
                }"
  >
    <template v-if="list_is_valid">
      List Valid
      <span class="material-symbols-outlined text-success-emphasis">check</span>
    </template>
    <template v-else>
      List Invalid
      <span class="material-symbols-outlined">warning</span>
    </template>
  </BButton>

  <BModal
      v-model="modal"
      size="lg"
      :teleport-to="modalContainer"
      ok-variant="secondary"
  >
    <template #title>
      List Validation Errors
    </template>

    <template #cancel>&nbsp;</template>
    <template #default>
      <ul>
        <li v-for="item in list_validation">
          {{ item }}
        </li>
      </ul>
    </template>
  </BModal>
</template>
