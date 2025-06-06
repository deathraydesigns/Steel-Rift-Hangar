<script setup>
import CardHeader from './CardParts/CardHeader.vue';
</script>
<template>
  <div class="game-card shrink-text-90">
    <div class="card-content-container">
      <CardHeader title="Multi-spectral Obscuration Emitter"/>

      <div class="section-heading d-flex">
        <div class="flex-shrink-1">
          Battlefield Asset
        </div>

        <div class="flex-grow-1 fw-normal font-outfit text-end">
          Size: 25mm
        </div>
      </div>

      <div class="card-description">
        <div><strong>Marker Size:</strong> 25mm
        </div>
        <div><strong>Effect:</strong>
          Any Unit, regardless of Commander, within 3” of this Marker counts as being within Covering Terrain. (i.e.,
          any
          LOS line drawn to this model will be considered to be drawn through Covering Terrain).

          <br><br>
          Additionally, units within 3” of of the Marker many not:
          <ul>
            <li>
              be targeted by an Off-Table Support Asset
            </li>
            <li>
              have Line of Sight drawn to them by a Target Designator
            </li>
            <li>
              be the target of Lock Orders
            </li>
          </ul>
        </div>
        <div><strong>Removed:</strong>
          When the Deploying model is activated again.
        </div>
      </div>
    </div>
  </div>
</template>