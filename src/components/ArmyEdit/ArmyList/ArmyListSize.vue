<script setup lang="ts">
import { BFormFloatingLabel, BFormInput, BFormSelect } from 'bootstrap-vue-next';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { GAME_SIZE, GAME_SIZES } from '../../../data/game-sizes';
import { useArmyListStore } from '../../../store/army-list-store';

const store = useArmyListStore();

const { max_tons } = storeToRefs(store);

const disabled = ref(false);
const armyTypeMaxTons = ref<PointSize>(100);

type PointSize = number | 'custom';
type Option = {
  text: string,
  value: PointSize
};

const options: Option[] = [
  GAME_SIZE.RECON,
  GAME_SIZE.STRIKE,
  GAME_SIZE.BATTLE,
  GAME_SIZE.WAR,
].map(id => {
  return {
    text: GAME_SIZES[id].display_name,
    value: GAME_SIZES[id].min_tons,
  };
});

options.push({
  text: 'Custom',
  value: 'custom',
});

watch(armyTypeMaxTons, () => {

  disabled.value = armyTypeMaxTons.value !== 'custom';

  if (armyTypeMaxTons.value !== 'custom') {
    max_tons.value = armyTypeMaxTons.value;
  }
});

function syncArmyType() {
  const result = options.find((option) => option.value === max_tons.value);

  if (result) {
    armyTypeMaxTons.value = result.value as PointSize;
  }
}

onMounted(() => {
  syncArmyType();
});
</script>
<template>
  <div class="row g-1">
    <div class="col">
      <BFormFloatingLabel
        label="Tonnage"
        label-for="list-max-tons"
        class="mb-1"
      >
        <BFormInput
          id="list-max-tons"
          v-model="max_tons"
          type="number"
          :disabled="disabled"
          @blur="syncArmyType"
        />
      </BFormFloatingLabel>
    </div>
    <div class="col">
      <div class="form-floating mb-1">
        <BFormSelect
          v-model="armyTypeMaxTons"
          :options="options"
          id="list-army-size-tons"
        />
        <label for="list-army-size-tons">Army Size</label>
      </div>
    </div>
  </div>
</template>