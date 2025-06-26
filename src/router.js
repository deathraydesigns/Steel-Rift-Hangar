import {createRouter, createWebHistory} from 'vue-router';
import ArmyEdit from './components/ArmyEdit.vue';
import ArmyPrint from './components/ArmyPrint.vue';
import ArmyListUrlDataLoader from './components/ArmyListUrlDataLoader.vue';

export const ROUTE_HOME = 'ROUTE_HOME';
export const ROUTE_PRINT = 'ROUTE_PRINT';
export const ROUTE_ARMY_LIST_DATA = 'ROUTE_ARMY_LIST_DATA';

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
    {
        name: ROUTE_ARMY_LIST_DATA,
        path: '/army-list-data',
        component: ArmyListUrlDataLoader,
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

