<script setup></script>
<template>
  <div class="print-settings-container m-auto">
    <div class="container">
      <div class="card my-3">
        <div class="card-header">
          <div class="d-flex">
            <div class="flex-grow-1 py-1">
              Print Settings
            </div>
            <div class="flex-shrink-1">
              <div class="btn-group ms-1" role="group">
                <slot name="nav"></slot>

              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <slot name="body"></slot>
        </div>
        <div class="card-footer">
          <div class="d-flex">
            <div class="flex-grow-1"></div>
            <div class="flex-shrink-1">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
