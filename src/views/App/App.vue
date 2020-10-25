<template>
    <div class="layout">
        <div class="nav">
            <router-link to="/app/rooms">Rooms</router-link> |
            <button @click="logout">Logout</button>
        </div>
        <div class="app">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import firebase from 'firebase/app';
import { useStore } from 'vuex';
import { State } from '@/store';
import io from 'socket.io-client';

export default defineComponent({
    name: 'App',
    setup() {
        const state = reactive({
        });
        const store = useStore<State>();

        const logout = (e: Event) => {
            e.preventDefault();
            firebase.auth().signOut()
                .then(response => {
                    console.log(response);
                })
                .catch(function(error: Error) {
                    console.error(error);
                });
        };

        const socket = io(process.env.VUE_APP_api_url);
        const database = firebase.database();

        socket.emit('new-user', store.state.user.uid);
        database.ref('/cards').once('value', cards => {
            console.log(cards.val());
            store.commit('setCards', cards.val());
        });

        store.commit('setSocket', socket);

        return {
            state,
            logout
        }
    }
})
</script>

<style lang="sass">

</style>