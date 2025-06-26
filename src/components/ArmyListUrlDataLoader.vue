<script setup>
import {urlDataStringToJson} from '../composables/url-data-parser.js';
import {loadSaveFileData} from '../store/helpers/store-save-load.js';
import {useRoute} from 'vue-router';
import {ROUTE_HOME, router} from '../router.js';
import {toaster} from '../toaster.js';
import {onMounted} from 'vue';

const route = useRoute();

onMounted(() => {
  const dataString = route.query.payload;

  try {
    const json = urlDataStringToJson(dataString);
    loadSaveFileData(json);

    router.push({name: ROUTE_HOME})
        .then(() => {
          toaster().info('Army List loaded from Data Url');
        });

  } catch (error) {

    router.push({name: ROUTE_HOME})
        .then(() => {
          toaster().validationError('Invalid Army List Data URL', error.message);
        });
  }
});

</script>
<template>
  <div></div>
</template>