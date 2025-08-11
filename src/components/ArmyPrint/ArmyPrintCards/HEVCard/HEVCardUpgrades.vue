<script setup>

import {computed} from 'vue';
import {useMechStore} from '../../../../store/mech-store.js';
import {useTeamStore} from '../../../../store/team-store.js';
import {MINEFIELD_DRONE_CARRIER_SYSTEM} from '../../../../data/mech-upgrades.js';
import {TRAIT_COMPACT, TRAIT_UPGRADE_LIMITED} from '../../../../data/upgrade-traits.js';
import {MECH_MOBILITIES, MOBILITY_BI_PEDAL} from '../../../../data/mech-mobility.js';
import {NO_ARMOR_UPGRADE} from '../../../../data/mech-armor-upgrades.js';

const mechStore = useMechStore();
const teamStore = useTeamStore();

const {mechId} = defineProps({
  mechId: {
    type: Number,
  },
});

const upgrades = computed(() => {
  const armorUpgrade = mechStore.getMechArmorUpgradeAttachmentInfo(mechId);
  const armorUpgradeArray = [];
  if (armorUpgrade.id !== NO_ARMOR_UPGRADE) {
    armorUpgradeArray.push({
      display_name: armorUpgrade.card_upgrade_display_name,
    });
  }

  const upgradesAttachments = mechStore.getMechUpgradesAttachmentInfo(mechId)
      .map(item => {

        if (item.traits) {
          item.traits = item.traits
              .filter(trait => trait.id !== TRAIT_COMPACT && trait.id !== TRAIT_UPGRADE_LIMITED);
        }

        return item;
      })
      // shown in weapons row instead
      .filter(item => item.upgrade_id !== MINEFIELD_DRONE_CARRIER_SYSTEM);

  const teamPerks = teamStore.getTeamPerksInfoByMech(mechId).filter(({visible_on_card}) => visible_on_card);
  teamPerks.forEach(item => item.is_team_perk = true);

  const mobility = [];
  const mech = mechStore.getMech(mechId);
  if (mech.mobility_id !== MOBILITY_BI_PEDAL) {
    mobility.push({
      display_name: MECH_MOBILITIES[mech.mobility_id].display_name,
    });
  }
  return [].concat(
      armorUpgradeArray,
      upgradesAttachments,
      teamPerks,
      mobility,
  );
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
        {{ upgrade.display_name }}<small v-if="upgrade.card_note"> ({{ upgrade.card_note }})</small><Icon v-if="upgrade.is_team_perk" name="team-perk" size="18px"/>
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