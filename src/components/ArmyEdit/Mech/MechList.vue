<script setup>

import Mech from '../Mech.vue';
import {storeToRefs} from 'pinia';
import {useMechStore} from '../../../store/mech-store.js';
import draggable from 'vuedraggable';
import {ref} from 'vue';
import {BButton} from 'bootstrap-vue-next';

const dragging = ref(false);

const mechStore = useMechStore();
const {mechs, totalTons} = storeToRefs(mechStore);

const collapsed = ref('');
const expanded = ref('');

function onSortableChange(event) {
  let moved = event.moved;
  if (!moved) {
    return;
  }

  mechStore.moveMech(moved.element, moved.newIndex);
}

function collapseAll() {
  collapsed.value = Date.now();
}

function expandAll() {
  expanded.value = Date.now();
}
</script>
<template>
  <div class="card text-bg-light">
    <div class="card-header">
      Mechs
      <div class="float-end">
        <BButton
            class="mx-1"
            variant="secondary"
            size="sm"
            @click="collapseAll"
        >
          Collapse All
        </BButton>
        <BButton
            class="mx-1"
            variant="secondary"
            size="sm"
            @click="expandAll"
        >
          Expand All
        </BButton>
        <strong>Tonnage: </strong>{{ totalTons }}
      </div>
    </div>
    <div class="card-body">
      <draggable
          :list="mechs"
          item-key="id"
          group="mechs"
          handle=".btn-grab"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
          @change="onSortableChange"
          :animation="200"
          :preventOnFilter="false"
      >
        <template #item="{ element }">
          <mech
              :mech-id="element.id"
              :collapse-signal="collapsed"
              :expand-signal="expanded"
          />
        </template>
      </draggable>
    </div>
    <div class="card-footer">
      <div class="float-end">
        <BButton variant="primary" @click="mechStore.addMech">Add Mech</BButton>
      </div>
    </div>
  </div>
</template>