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
        }
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
        setWsUser: (state, userName) => {
            state.wsUser = {
                ...state.wsUser,
                userName,
                room: state.wsUser.room || null
            };
        },
        setWsUserId: (state, id) => {
            state.wsUser = {
                ...state.wsUser,
                id
            };
        }
    },
    actions: {
    },
    modules: {
    },
});
