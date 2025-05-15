<script setup>

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  perks: {
    type: Array,
  },
  useFullDisplayName: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'sm',
  },
});

const {
  perks,
  useFullDisplayName,
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

      <Icon name="team-perk"/>
    </span></template>

    <template #title>
      Group Perks
      <Icon name="team-perk"/>
    </template>

    <template v-for="perk in perks">
      <template v-if="useFullDisplayName">
        <div class="fw-bold">
          {{ perk.display_name }}:
        </div>
        <p class="p-gap">{{ perk.description }}</p>
      </template>
      <template v-else>

        <p class="p-gap">
          <strong>
            {{ perk.display_name_short || perk.display_name }}:
          </strong>
          {{ perk.description }}
        </p>
      </template>

    </template>
  </BPopover>
</template>