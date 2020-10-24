import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentStep: 1,
        userName: '',
        rooms: [],
        currentRoom: '',
        socket: null,
        wsUser: {
            id: null,
            userName: '',
            room: null
        },
        // NEW USER FIREBASE AUTH
        user: null
    },
    mutations: {
        setUserName: (state, userName) => {
            state.userName = userName;
        },
        setRooms: (state, rooms) => {
            state.rooms = rooms;
        },
        nextStep: (state, step) => {
            state.currentStep = step;
        },
        setCurrentRoom: (state, room) => {
            state.currentRoom = room;
            state.wsUser = {
                ...state.wsUser,
                room
            }
        },
        setSocket: (state, socket) => {
            state.socket = socket;
        },
        setWsUser: (state, user) => {
            state.wsUser = user;
        },
        // NEW USER FIREBASE AUTH
        setUser: (state, userData) => {
            state.user = userData;
        }
    },
    actions: {
    },
    modules: {
    },
});
