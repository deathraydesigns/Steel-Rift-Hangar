<script setup>
import {storeToRefs} from 'pinia';
import {useSecondaryAgendaStore} from '../../../store/secondary-agenda-store.js';
import SecondaryAgendaDefinition from '../../ArmyEdit/SecondaryAgendas/SecondaryAgendaDefinition.vue';

const {secondary_agendas, max_secondary_agendas} = storeToRefs(useSecondaryAgendaStore());
</script>
<template>

  <div v-if="secondary_agendas.length">
    <div class="divider"></div>

    <div class="ref-heading">
      <span class="">
        Secondary Agendas
      </span>
      <small>
        (Choose {{ max_secondary_agendas }} at game start)
      </small>
    </div>
    <SecondaryAgendaDefinition
        v-for="item in secondary_agendas"
        :type-display-name="item.type_display_name"
        :subtype-display-name="item.subtype_display_name"
        :display-name="item.display_name"
        :description="item.description"
    />
  </div>
</template>
