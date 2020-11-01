import { createStore } from 'vuex'
import io from 'socket.io-client';

export interface State {
    socket: SocketIOClient.Socket | null;
    cards: any[];
    user: any;
    loading: boolean;
}
const state: State = {
    socket: null,
    cards: [],
    user: null,
    loading: true
}

export default createStore({
    state,
    getters: {
        getUserName: state => () => state.user.displayName
    },
    mutations: {
        setSocket: (state: State, socket) => {
            state.socket = socket;
        },
        setCards: (state: State, cards: any[]) => {
            state.cards = cards;
        },
        setUser: (state: State, user: any) => {
            state.user = user;
            state.loading = false;
        }
    },
    actions: {
    },
    modules: {
    }
})
