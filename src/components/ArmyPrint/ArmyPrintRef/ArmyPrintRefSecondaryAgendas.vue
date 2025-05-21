<script setup>
import {storeToRefs} from 'pinia';
import {useSecondaryAgendaStore} from '../../../store/secondary-agenda-store.js';

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

    <div v-for="item in secondary_agendas">
      <div>
        <span class="fw-bold">
          {{ item.display_name }}
        </span>
        ({{ item.type_display_name }}<span v-if="item.type !== 'Team'"> {{ item.type }}</span>)
      </div>
      <div>{{ item.description }}</div>
    </div>

  </div>
</template>
