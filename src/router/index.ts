import store from '@/store';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Auth',
        component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Auth.vue'),
        children: [
            {
                path: '/',
                name: 'Login',
                component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login/Login.vue')
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register/Register.vue')
            }
        ]
    },
    {
        path: '/app',
        name: 'App',
        component: () => import(/* webpackChunkName: "App" */ '../views/App/App.vue'),
        children: [
            {
                path: 'rooms',
                name: 'Rooms',
                component: () => import(/* webpackChunkName: "rooms" */ '../views/App/Rooms/Rooms.vue'),
            },
            {
                path: ':roomId',
                name: 'roomId',
                component: () => import(/* webpackChunkName: "rooms" */ '../views/App/Room/Room.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (store.state.loading) return

    // NO LOGGED ROUTES
    if (store.state.user) {
        if (to.name === 'Register' || to.name === 'Login') {
            next({ name: 'App' });
            return;
        }
        next();
        return;
    }

    // NO LOGGED ROUTES
    if (to.name === 'App') {
        next({ name: 'Login' });
        return;
    }

    next();
});

export default router
