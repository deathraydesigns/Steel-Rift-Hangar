import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import {createBootstrap} from 'bootstrap-vue-next';
import App from './App.vue';
import './styles/main.scss';
import {router} from './router.js';

const app = createApp(App);
const pinia = createPinia();
const bootstrap = createBootstrap({
    components: {
        BPopover: {
            delay: {show: 100, hide: 0},
        },
    },
});

pinia.use(piniaPluginPersistedstate);

app.config.performance = true;
app.use(router);
app.use(bootstrap);
app.use(pinia);
app.mount('#app');