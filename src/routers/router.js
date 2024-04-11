import { createWebHistory, createRouter } from "vue-router";
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import AvailableRoom from '../components/AvailableRoom.vue';

const routes = [
    { 
        path: "/", 
        name: "Home", 
        component: Home 
    },
    { 
        path: "/Login", 
        name: "Login", 
        component: Login 
    },
    {
        path: "/AvailableRoom",
        name: "AvailableRoom",
        component: AvailableRoom
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;