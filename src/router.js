import {createRouter, createWebHistory} from 'vue-router';
import ArmyEdit from './components/ArmyEdit.vue';
import ArmyPrint from './components/ArmyPrint.vue';

export const ROUTE_HOME = 'ROUTE_HOME';
export const ROUTE_PRINT = 'ROUTE_PRINT';

const routes = [
    {
        name: ROUTE_HOME,
        path: '/',
        component: ArmyEdit,
    },
    {
        name: ROUTE_PRINT,
        path: '/print',
        component: ArmyPrint,
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

