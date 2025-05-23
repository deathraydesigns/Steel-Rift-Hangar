<script setup>
import {storeToRefs} from 'pinia';
import {useSecondaryAgendaStore} from '../../store/secondary-agenda-store.js';

const {secondary_agendas, max_secondary_agendas} = storeToRefs(useSecondaryAgendaStore());
</script>
<template>

  <div class="card" v-if="secondary_agendas.length">
    <div class="card-header">
      <span class="fw-bold">
        Secondary Agendas
      </span>
      (Choose {{ max_secondary_agendas }} at game start)
    </div>
    <div class="card-body">
      <div v-for="item in secondary_agendas">
        <div>
          <span class="fw-bold">
            {{ item.display_name }}
          </span>
          (<span class="fw-medium" v-if="item.type">{{ item.type }}: </span>{{ item.type_display_name }})
        </div>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>

</template>
