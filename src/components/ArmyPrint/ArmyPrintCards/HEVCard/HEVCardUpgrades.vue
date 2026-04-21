<script setup lang="ts">
import { computed } from 'vue';
import { MECH_ARMOR_UPGRADE } from '../../../../data/mech-armor-upgrades';
import { MECH_MOBILITIES, MECH_MOBILITY } from '../../../../data/mech-mobility';
import { MECH_UPGRADE } from '../../../../data/mech-upgrades.js';
import { UPGRADE_TRAIT } from '../../../../data/upgrade-traits.js';
import { useMechStore } from '../../../../store/mech-store';
import { useTeamStore } from '../../../../store/team-store';
import type { Trait } from '../../../../types';
import SvgIcon from '../../../UI/Icon.vue';

const mechStore = useMechStore();
const teamStore = useTeamStore();

const { mechId } = defineProps<{
  mechId: number
}>();

type UpgradeItem = {
  display_name?: string,
  card_note?: string,
  traits?: Trait[],
  is_team_perk?: boolean,
  max_uses?: number,
}

const upgrades = computed((): UpgradeItem[] => {
  const armorUpgrade = mechStore.getMechArmorUpgradeAttachmentInfo(mechId)!;
  const armorUpgradeArray: { display_name?: string }[] = [];
  if (armorUpgrade.id !== MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE) {
    armorUpgradeArray.push({
      display_name: armorUpgrade.card_upgrade_display_name,
    });
  }

  const upgradesAttachments = mechStore.getMechUpgradesAttachmentInfo(mechId)
    .map(item => {

      if (item.traits) {
        item.traits = item.traits
          .filter(trait => trait.id !== UPGRADE_TRAIT.COMPACT && trait.id !== UPGRADE_TRAIT.LIMITED);
      }

      return item;
    })
    // shown in weapons row instead
    .filter(item => item.upgrade_id !== MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM);

  const teamPerks = teamStore.getTeamPerksInfoByMech(mechId).filter(({ visible_on_card }) => visible_on_card);
  teamPerks.forEach(item => (item as any).is_team_perk = true);

  const mobility = [];
  const mech = mechStore.getMech(mechId)!;
  if (mech.mobility_id !== MECH_MOBILITY.BI_PEDAL) {
    mobility.push({
      display_name: MECH_MOBILITIES[mech.mobility_id].display_name,
    });
  }
  return [
    ...armorUpgradeArray,
    ...upgradesAttachments,
    ...teamPerks,
    ...mobility,
  ];
});

const orders = computed(() => {
  const grantedOrders = mechStore.getMechGrantedOrdersCollection(mechId);

  return grantedOrders.all();
});
</script>
<template>

  <div v-if="upgrades.length">
    <div class="section-heading">
      Upgrades
    </div>
    <div class="upgrades">
      <span v-for="(upgrade, index) in upgrades">
        {{ upgrade.display_name }}<small v-if="upgrade.card_note"> ({{ upgrade.card_note }})</small>
        <SvgIcon v-if="upgrade.is_team_perk" name="team-perk" size="18px" />
        <template v-if="upgrade.max_uses">&nbsp;</template>
        <span
          v-if="upgrade.max_uses"
          v-for="i in Array(upgrade.max_uses)"
          class="upgrade-use"
        >&nbsp;</span>
        <template v-if="upgrade.traits?.length">:</template>
        <template v-for="trait in upgrade.traits">
          {{ trait.display_name }}
        </template>
        <span v-if="index !== upgrades.length -1">, </span>
      </span>
      <span v-if="orders.length">
        <span class="fw-bold"> Special Orders: </span>
        <span v-for="(order, index) in orders">
          {{ order.display_name }}
          <span v-if="index !== orders.length -1">, </span>
        </span>
      </span>
    </div>
  </div>
</template>