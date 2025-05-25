<script setup>

import logoSvg from '/steel-rift-logo.svg';
import {BCollapse, BNavbarToggle} from 'bootstrap-vue-next';
import BtnColorMode from './UI/BtnColorMode.vue';
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-lg">
      <div class="d-lg-flex px-4">

        <div class="col-xl-3 flex-lg-shrink-1">
          <a class="navbar-brand" href="#">
            <img :src="logoSvg" height="25" class="logo" alt="Steel Rift: Hangar logo"/>
          </a>
          <div class="float-end">
            <BNavbarToggle target="nav-collapse" size="sm"/>
            <BtnColorMode class="d-lg-none"/>
          </div>
        </div>

        <div class="flex-lg-grow-1">
          <BCollapse id="nav-collapse" is-nav>
            <ul class="navbar-nav mb-2 me-auto mb-lg-0 px-lg-4 px-lg-0 mt-3 mt-lg-0">
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
            <div class="flex-grow-1">
              <a class="btn btn-orange btn-sm ms-lg-2 small"
                 href="https://deathraydesigns.com/product-category/minis/steel-rift/">Buy
                Now</a>
            </div>
            <div class="d-flex">
              <BtnColorMode class="d-none d-lg-inline-block"/>
            </div>
          </BCollapse>
        </div>
      </div>
    </div>
  </nav>
</template>