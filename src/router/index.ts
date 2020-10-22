import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Step1 from '../views/Step1/Step1.vue';
import Step2 from '../views/Step2/Step2.vue';
import Step3 from '../views/Step3/Step3.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

    {
        path: '/',
        redirect: '/step1'
    },
    {
        path: '/step1',
        name: 'Step1',
        component: Step1,
    },
    {
        path: '/step2',
        name: 'Step2',
        component: Step2
    },
    {
        path: '/step3',
        name: 'Step3',
        component: Step3
    },
    // {
    //     path: '/home/',
    //     name: 'Home',
    //     component: Home,
    // },
    // {
    //     path: '/home/:roomId',
    //     name: 'Home',
    //     component: Home,
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // },
];

const router = new VueRouter({
    routes,
});

export default router;
