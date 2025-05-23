<script setup>
import CardHeader from './CardParts/CardHeader.vue';
import CardFooter from './CardParts/CardFooter.vue';
</script>
<template>
  <div class="game-card">
    <div class="card-content-container">
      <CardHeader title="Mine Drone"/>

      <div class="section-heading">Battlefield Asset</div>

      <div class="card-description">
        <div><strong>Placing:</strong> May not be placed within 6” of another friendly Mine Drone token (unless deployed
          from a Garrison unit). When placed from a Garrison unit, tokens are placed within 3” of the unit.
        </div>

        <div><strong>Triggered:</strong>
          If an enemy model ends any Order within 4”, the Commander may remove the token to make an Engage Order with an
          Attack against that model and all other enemy models in range. Line of Sight for this Attack is drawn from the
          Target Model to itself (therefore it is never obstructed). The token and Active Unit do not require Line of
          Sight to each other, as the Drones will attack using their sensors. Units may not Return Fire during this
          attack. Once this Engage Order is resolved remove the token. Once this is complete the Active Player may
          continue issuing any remaining orders to the Active Model. A Mine Drone never damages an Outpost.
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

      <CardFooter/>
    </div>
  </div>
</template>