<script setup lang="ts">
import { setComponentScope } from 'pinia-scope';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useMechStore } from '../../../store/mech-store';
import CardFooter from './CardParts/CardFooter.vue';
import CardHeader from './CardParts/CardHeader.vue';
import HEVCardHp from './HEVCard/HEVCardHp.vue';
import HEVCardStats from './HEVCard/HEVCardStats.vue';
import HEVCardUpgrades from './HEVCard/HEVCardUpgrades.vue';
import HEVCardWeapons from './HEVCard/HEVCardWeapons.vue';

const { mechId, storeScope = '' } = defineProps<{
  mechId: number,
  storeScope?: string
}>();

setComponentScope(storeScope);
const mechStore = useMechStore(storeScope);

const info = computed(() => mechStore.getMechInfo(mechId)!);

const adjustableRef = useTemplateRef<HTMLElement | null>('adjustableSize');

// 3.6in card = 336px
const MAX_CONTAINER_HEIGHT = 336;
// matches .output-container font-size; children use % so they scale proportionally
const BASE_FONT_SIZE_PT = 10;
const MIN_FONT_SIZE_PT = 6;
const STEP_PT = 0.25;

function adjustFontSize() {
  const el = adjustableRef.value;
  if (!el) return;
  const container = el.closest('.card-content-container') as HTMLElement | null;
  if (!container) return;

  el.style.fontSize = '';
  if (container.scrollHeight <= MAX_CONTAINER_HEIGHT) return;

  let size = BASE_FONT_SIZE_PT;
  while (container.scrollHeight > MAX_CONTAINER_HEIGHT && size > MIN_FONT_SIZE_PT) {
    size -= STEP_PT;
    el.style.fontSize = `${size}pt`;
  }
}

onMounted(adjustFontSize);
</script>
<template>
  <div class="game-card">
    <div class="card-content-container">

      <CardHeader :title="info.display_name" />
      <HEVCardStats :mech-id="mechId" />
      <HEVCardHp :mech-id="mechId" />
      <div ref="adjustableSize">
        <HEVCardWeapons :mech-id="mechId" @content-changed="adjustFontSize" />
        <HEVCardUpgrades :mech-id="mechId" @content-changed="adjustFontSize" />
      </div>
      <CardFooter />
    </div>
  </div>
</template>