<script setup>

import logoSvg from '/steel-rift-logo.svg';
import {BCollapse, BNavbarToggle} from 'bootstrap-vue-next';
import BtnColorMode from './UI/BtnColorMode.vue';
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-lg">
      <div class="px-4">
        <div class="row">

          <div class="col-3">
            <a class="navbar-brand" href="#">
              <img :src="logoSvg" height="25" class="logo" alt="Steel Rift: Hangar logo"/>
            </a>
          </div>
          <div class="col flex-grow-1">
            <BNavbarToggle target="nav-collapse"/>
            <BCollapse id="nav-collapse" is-nav>
              <ul class="navbar-nav mb-2 me-auto mb-lg-0 px-4 px-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="https://www.steelrift.com/play">Get Started</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.steelrift.com/rules">Rules</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.steelrift.com/downloads">Downloads</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.steelrift.com/faq">FAQ</a>
                </li>
              </ul>
              <div class="d-flex flex-grow-1">
                <a class="btn btn-orange btn-sm ms-2 small"
                   href="https://deathraydesigns.com/product-category/minis/steel-rift/">Buy
                  Now</a>
              </div>
              <div class="d-flex">
                <BtnColorMode/>
              </div>
            </BCollapse>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>