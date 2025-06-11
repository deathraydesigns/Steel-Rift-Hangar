<script setup>
import {storeToRefs} from 'pinia';
import {useSecondaryAgendaStore} from '../../store/secondary-agenda-store.js';
import {BModal} from 'bootstrap-vue-next';
import {ref} from 'vue';
import SecondaryAgendaDefinition from './SecondaryAgendas/SecondaryAgendaDefinition.vue';

const {
  universal_secondary_agendas,
  secondary_agendas,
  max_secondary_agendas,
} = storeToRefs(useSecondaryAgendaStore());

const secondaryAgendaModal = ref(false);
</script>
<template>
  <div class="card">
    <div class="card-header d-flex text-bg-primary">
      <div class="flex-grow-1 py-1 ps-2">
        <span class="fw-bold">
          Secondary Agendas
        </span>
        (Choose {{ max_secondary_agendas }} at game start)
      </div>
      <div class="tex-end">
        <button class="btn btn-secondary btn-sm" @click="secondaryAgendaModal = !secondaryAgendaModal">
          Show Universal Secondary Agendas
        </button>
      </div>
    </div>
    <div class="card-body">
      <SecondaryAgendaDefinition
          v-for="item in secondary_agendas"
          :type-display-name="item.type_display_name"
          :subtype-display-name="item.subtype_display_name"
          :display-name="item.display_name"
          :description="item.description"
      />
    </div>
  </div>
  <BModal
      v-model="secondaryAgendaModal"
      centered
      title="Universal Secondary Agendas"
      size="lg"
  >
    <template #cancel>&nbsp;</template>
    <SecondaryAgendaDefinition
        v-for="item in universal_secondary_agendas"
        :type-display-name="item.type_display_name"
        :subtype-display-name="item.subtype_display_name"
        :display-name="item.display_name"
        :description="item.description"
    />

  </BModal>
</template>
