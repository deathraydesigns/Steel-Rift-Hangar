<script setup lang="ts">
import CardFooter from './CardParts/CardFooter.vue';
import CardHeader from './CardParts/CardHeader.vue';
</script>
<template>
  <div class="game-card shrink-text-90">
    <div class="card-content-container">
      <CardHeader title="Mine Drone" />

      <div class="section-heading d-flex">
        <div class="flex-shrink-1">
          Battlefield Asset
        </div>

        <div class="flex-grow-1 fw-normal font-outfit text-end">
          Size: 25mm
        </div>
      </div>

      <div class="card-description">
        <div><strong>Placing:</strong> May not be placed within 6” of another friendly Mine Drone token. When placed from a Unit, tokens are placed within 3” of the unit.
        </div>

        <div><strong>Triggered:</strong>
          If an enemy Unit
          ends any Order within 4” of a Mine Drone Token,
          the Commander of the Mine Drone may interrupt
          their Activation and perform an ENGAGE Order
          against that Unit with a Weapon of Damage Rating
          4, and the AP(1) and Blast (4”) traits. Ignore all
          LoS requirements and modifiers for Covered, Bloc‑
          king, Secondary Target, and/or Bypassing Shot.
          A Mine Drone never damages an Outpost.
        </div>

        <div><strong>Targeted:</strong> When targeted by an attack from <span class="fw-medium">Mine Drone Tracking
          Submunitions</span> the target Minefield
          makes a Defense Roll on a 3+. If at least one point of Damage would be inflicted, remove the Token.
        </div>

      </div>

      <table class="table-stats">
        <thead>
        <tr>
          <th>Weapon</th>
          <th>Dmg</th>
          <th>Rng</th>
          <th class="text-start">Traits</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div>
              Detonate
            </div>
          </td>
          <td>
            4
          </td>
          <td>-</td>
          <td class="text-start">
            AP(1), Blast(4")
          </td>
        </tr>
        </tbody>
      </table>

      <CardFooter />
    </div>
  </div>
</template>