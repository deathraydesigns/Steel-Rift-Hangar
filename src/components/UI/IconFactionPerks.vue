<script setup>

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  perks: {
    type: Array,
  },
  size: {
    type: String,
    default: 'sm',
  },
});

const {
  perks,
  size,
} = props;

</script>
<template>
  <BPopover
      :hover="true"
      :close-on-hide="true"
      :delay="{show: 0, hide: 0}"
  >
    <template #target><span
          v-show="perks && perks.length"
          :class="`btn btn-${size} btn-light ${props.class}`">

        <span class="material-symbols-outlined">
          flag
        </span>
      </span></template>

    <template #title>
      Faction Perks
      <span class="material-symbols-outlined">
        flag
      </span>
    </template>

    <template v-for="perk in perks">
      <div class="fw-bold">
        {{ perk.display_name }}:
      </div>
      <p class="p-gap">{{ perk.description }}</p>
    </template>
  </BPopover>
</template>